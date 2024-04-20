function format(disassembled) {
  const lines = [];
  for (const op of disassembled) {
    lines.push(`[${op.offset.toString(16).padStart(4, '0')}] ${op.opcode}${op.input ? ` 0x${op.input.toString('hex')}` : ''}`);
  }

  return lines.join('\n');
}

module.exports = { format };
