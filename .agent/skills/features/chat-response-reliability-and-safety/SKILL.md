---
name: feature-chat-response-reliability-and-safety
description: "Implementacion de ANCLORA-CRRS-001 bajo SDD."
---

# Skill - chat-response-reliability-and-safety

## Lecturas obligatorias
1) AGENTS.md
2) .agent/rules/workspace-governance.md
3) .agent/rules/feature-chat-response-reliability-and-safety.md
4) sdd/features/chat-response-reliability-and-safety/chat-response-reliability-and-safety-INDEX.md
5) sdd/features/chat-response-reliability-and-safety/chat-response-reliability-and-safety-spec-v1.md
6) sdd/features/chat-response-reliability-and-safety/chat-response-reliability-and-safety-test-plan-v1.md
"@;
  ".antigravity/prompts/master-prompt-agentes-paralelos.md" = @"
PROMPT: Orquesta implementacion de una feature por agentes.

PASOS:
1) Agent A.
2) Agent B + Agent C en paralelo.
3) Agent D.
4) Gate final.

REGLAS:
- 1 prompt = 1 commit.
- No saltar orden.