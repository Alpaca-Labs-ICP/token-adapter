import { Actor, Agent } from "@dfinity/agent";
import { idlFactory } from "./token.did";
import { _SERVICE as ActorType } from "./token.type";
/**
 * description: Create actor instance
 */
export const createActor = ({
  agent,
  canisterId,
}: {
  agent: Agent;
  canisterId: string;
}): ActorType => {
  // Creates an actor with using the candid interface and the Agent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};
export * from "./token.did";
export * from "./token.type";
