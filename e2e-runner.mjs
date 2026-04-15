// End-to-end test: simulates exactly what the frontend does
// Usage: node e2e-runner.mjs
// Requires: Node 18+ (for native fetch and crypto.subtle)

const BASE = process.env.BASE_URL || 'http://localhost:3000';

// ── SHA-256 + PoW solver (same logic as src/utils/pow.ts) ───────────────

async function sha256(message) {
  const data = new TextEncoder().encode(message);
  return crypto.subtle.digest('SHA-256', data);
}

function hasLeadingZeroBits(buffer, bits) {
  const view = new Uint8Array(buffer);
  let remaining = bits;
  for (const byte of view) {
    if (remaining >= 8) {
      if (byte !== 0) return false;
      remaining -= 8;
    } else if (remaining > 0) {
      const mask = 0xff << (8 - remaining);
      return (byte & mask) === 0;
    } else {
      break;
    }
  }
  return remaining <= 0;
}

async function solveChallenge() {
  const res = await fetch(`${BASE}/api/challenge`);
  if (!res.ok) throw new Error(`/api/challenge failed: ${res.status}`);
  const { nonce, difficulty } = await res.json();
  console.log(`  challenge: nonce=${nonce.slice(0, 8)}… difficulty=${difficulty}`);

  const t0 = Date.now();
  for (let i = 0; ; i++) {
    const attempt = String(i);
    const hash = await sha256(nonce + attempt);
    if (hasLeadingZeroBits(hash, difficulty)) {
      console.log(`  PoW solved in ${Date.now() - t0}ms (${i} iterations)`);
      return { nonce, solution: attempt };
    }
  }
}

// ── Test helpers ────────────────────────────────────────────────────────

async function testRun(label, code, expectInOutput) {
  console.log(`\n▶ ${label}`);
  const pow = await solveChallenge();
  const t0 = Date.now();
  const res = await fetch(`${BASE}/api/run`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-PoW-Nonce': pow.nonce,
      'X-PoW-Solution': pow.solution,
    },
    body: JSON.stringify({ body: code }),
  });
  const elapsed = Date.now() - t0;
  const data = await res.json();
  const pass = !data.errors && data.output.includes(expectInOutput);
  console.log(`  status: ${res.status} | ${elapsed}ms`);
  console.log(`  output: ${JSON.stringify(data.output || '').slice(0, 200)}`);
  if (data.errors) console.log(`  errors: ${JSON.stringify(data.errors).slice(0, 300)}`);
  console.log(`  ${pass ? '✅ PASS' : '❌ FAIL'}`);
  return pass;
}

async function testLab(label, files, mode, expectInOutput) {
  console.log(`\n▶ ${label}`);
  const pow = await solveChallenge();
  const t0 = Date.now();
  const res = await fetch(`${BASE}/api/lab`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-PoW-Nonce': pow.nonce,
      'X-PoW-Solution': pow.solution,
    },
    body: JSON.stringify({ files, mode }),
  });
  const elapsed = Date.now() - t0;
  const data = await res.json();
  const pass = mode === 'test'
    ? data.output.includes(expectInOutput)
    : !data.errors && data.output.includes(expectInOutput);
  console.log(`  status: ${res.status} | ${elapsed}ms`);
  console.log(`  output: ${JSON.stringify(data.output || '').slice(0, 200)}`);
  if (data.errors) console.log(`  errors: ${JSON.stringify(data.errors).slice(0, 300)}`);
  console.log(`  ${pass ? '✅ PASS' : '❌ FAIL'}`);
  return pass;
}

// ── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n════════════════════════════════════════════`);
  console.log(`  GopherLab E2E Test — ${BASE}`);
  console.log(`════════════════════════════════════════════`);

  // 0. Health check
  console.log('\n▶ Health check');
  try {
    const h = await fetch(`${BASE}/api/health`);
    // nginx rewrites /api/health -> /health on runner
    console.log(`  /api/health → ${h.status} ${await h.text()}`);
  } catch (e) {
    console.log(`  ❌ Cannot reach ${BASE}: ${e.message}`);
    process.exit(1);
  }

  const results = [];

  // 1. /api/run — Hello World (same as TestHandleRun_ValidHelloWorld)
  results.push(await testRun(
    '/api/run — Hello World',
    'package main\nimport "fmt"\nfunc main() { fmt.Println("hello test") }',
    'hello test'
  ));

  // 2. /api/run — Multiple statements (same as TestHandleRun_MultipleStatements)
  results.push(await testRun(
    '/api/run — add(2, 3)',
    'package main\nimport "fmt"\nfunc add(a, b int) int { return a + b }\nfunc main() { fmt.Println(add(2, 3)) }',
    '5'
  ));

  // 3. /api/run — Compile error
  results.push(await (async () => {
    console.log('\n▶ /api/run — Compile error');
    const pow = await solveChallenge();
    const res = await fetch(`${BASE}/api/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-PoW-Nonce': pow.nonce,
        'X-PoW-Solution': pow.solution,
      },
      body: JSON.stringify({ body: 'package main\nfunc main() { broken syntax }' }),
    });
    const data = await res.json();
    const pass = !!data.errors && !data.output;
    console.log(`  errors: ${JSON.stringify(data.errors).slice(0, 200)}`);
    console.log(`  ${pass ? '✅ PASS' : '❌ FAIL'}`);
    return pass;
  })());

  // 4. /api/lab — run mode, single file (same as TestHandleLab_Run_HelloWorld)
  results.push(await testLab(
    '/api/lab — run Hello World',
    [{ name: 'main.go', body: 'package main\nimport "fmt"\nfunc main() { fmt.Println("lab ok") }' }],
    'run',
    'lab ok'
  ));

  // 5. /api/lab — run mode, multi file (same as TestHandleLab_Run_MultiFile)
  results.push(await testLab(
    '/api/lab — run Multi-file',
    [
      { name: 'main.go', body: 'package main\nimport "fmt"\nfunc main() { fmt.Println(greet("Go")) }' },
      { name: 'greet.go', body: 'package main\nfunc greet(name string) string { return "Hello, " + name + "!" }' },
    ],
    'run',
    'Hello, Go!'
  ));

  // 6. /api/lab — test mode, passing
  results.push(await testLab(
    '/api/lab — test PASS',
    [
      { name: 'add.go', body: 'package main\nfunc add(a, b int) int { return a + b }' },
      { name: 'add_test.go', body: 'package main\nimport "testing"\nfunc TestAdd(t *testing.T) {\n\tif got := add(2, 3); got != 5 {\n\t\tt.Errorf("got %d", got)\n\t}\n}' },
      { name: 'main.go', body: 'package main\nfunc main() {}' },
    ],
    'test',
    'PASS'
  ));

  // Summary
  const passed = results.filter(Boolean).length;
  const total = results.length;
  console.log(`\n════════════════════════════════════════════`);
  console.log(`  Results: ${passed}/${total} passed`);
  console.log(`════════════════════════════════════════════\n`);
  process.exit(passed === total ? 0 : 1);
}

main().catch(e => { console.error(e); process.exit(1); });
