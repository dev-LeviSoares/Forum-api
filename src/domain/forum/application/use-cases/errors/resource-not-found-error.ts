import { UseCaseError } from "@/core/errors/use-case-error.js";

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor() {
    super('Resoucer not found')
  }
}