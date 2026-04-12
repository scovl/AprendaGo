# Stage 1: build the terminal relay binary
FROM golang:1.23-alpine AS builder
WORKDIR /app
COPY go.mod ./
COPY *.go ./
RUN go mod tidy && go build -o /terminal .

# Stage 2: runtime with Go toolchain for learners
FROM golang:1.23-alpine

RUN apk add --no-cache bash git curl make protobuf protoc

# Alpine /etc/profile resets PATH — restore Go bin for all login shells
RUN echo 'export PATH=/usr/local/go/bin:$GOPATH/bin:$PATH' > /etc/profile.d/go.sh

RUN adduser -D -u 1001 -s /bin/bash learner && \
    mkdir -p /home/learner/workspace \
             /home/learner/go \
             /home/learner/.cache/go-build && \
    chown -R learner:learner /home/learner

COPY --from=builder /terminal /terminal
COPY bashrc /home/learner/.bashrc
COPY setup-workspace.sh /tmp/setup-workspace.sh
RUN chown learner:learner /home/learner/.bashrc /tmp/setup-workspace.sh

USER learner
WORKDIR /home/learner/workspace

ENV GOPATH=/home/learner/go
ENV GOCACHE=/home/learner/.cache/go-build
ENV PATH=/usr/local/go/bin:/home/learner/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Install Go CLI tools needed by the lessons (versions compatible with Go 1.23)
RUN go install golang.org/x/tools/cmd/goimports@v0.21.0 && \
    go install honnef.co/go/tools/cmd/staticcheck@v0.4.7 && \
    go install golang.org/x/vuln/cmd/govulncheck@v1.1.3 && \
    go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.34.1 && \
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.3.0 && \
    go install github.com/golangci/golangci-lint/cmd/golangci-lint@v1.59.1

# Create per-lesson workspace projects (pre-downloads all modules)
RUN bash /tmp/setup-workspace.sh

EXPOSE 8082
CMD ["/terminal"]
