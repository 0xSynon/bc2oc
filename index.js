#!/usr/bin/env node

const { disassemble } = require('./lib/disassemble');
const { format } = require('./lib/format');

function displayHelp() {
  console.log("Usage:");
  console.log("  huffc /path/to/contract.huff --bytecode | bc2oc  # Convert bytecode to opcodes");
  console.log("  bc2oc                                            # Display this help message");
}

if (process.stdin.isTTY) {
  displayHelp();
  process.exit(0);
}

process.stdin.setEncoding('utf8');

const chunks = [];
process.stdin.on('readable', () => {
  let chunk;
  while (chunk = process.stdin.read()) {
    chunks.push(chunk);
  }
});

process.stdin.on('end', () => {
  const bytecode = chunks.join('');
  const disassembled = disassemble(bytecode);
  console.log(format(disassembled));
});
