const { OpCodes } = require('./opcodes');

function disassemble(bytecode) {
  const buffer = Buffer.from(bytecode, 'hex');
  const disassembled = [];
  for (let i = 0; i < buffer.length; i++) {
    const byte = buffer[i];
    const opcode = OpCodes[byte];
    if (opcode === null) {
      throw new Error(`Unknown opcode ${opcode.toString(16)}`);
    }
    const op = {
      offset: i,
      opcode,
      input: null
    };
    if (opcode.startsWith('PUSH')) {
      const n = parseInt(opcode.replace('PUSH', ''));
      op.input = buffer.slice(i + 1, i + 1 + n);
      if (op.input.length !== n) {
        throw new Error(`Wrong amoung of bytes for PUSH operation at offset ${i}`);
      }
      i += n;
    }
    disassembled.push(op);
  }

  return disassembled;
}

module.exports = {
  disassemble
};
