# Bytecode to Opcodes

Convert Bytecode from STDIN to formatted Opcodes. The output format is:

```
[offset] OPCODE INPUT
```

- offset: 2 bytes hex padded Program counter
- OPCODE: the opcode's name
- INPUT: only for PUSH operations, the bytes pushed to the stack
