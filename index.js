#!/usr/bin/env node

const { disassemble } = require('./lib/disassemble');
const { format } = require('./lib/format');

function displayHelp() {
  console.log('Usage:');
  console.log('  huffc contract.huff --bytecode | bc2oc [options] # Convert bytecode to opcodes');
  console.log('  bc2oc                                            # Display this help message');
  console.log('');
  console.log('Options:');
  console.log('  --strip-init           Convert initialization code to runtime');
  console.log('');
}

if (process.stdin.isTTY) {
  displayHelp();
  process.exit(0);
}

process.argv.shift();
process.argv.shift();

const chunks = [];
process.stdin.on('readable', () => {
  let chunk;
  while (chunk = process.stdin.read()) {
    chunks.push(chunk);
  }
});

process.stdin.on('end', () => {
  let bytecode = chunks.join('');
  if (process.argv.includes('--strip-init')) {
    const index = bytecode.indexOf('3d393df3');
    if (index === -1) {
      throw new Error('Could not locate initialization');
    }
    bytecode = bytecode.slice(index + 8);
  }
  const disassembled = disassemble(bytecode);
  console.log(format(disassembled));
});
