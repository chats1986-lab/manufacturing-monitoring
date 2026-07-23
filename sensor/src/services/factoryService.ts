import type { FactoryRepository } from "../repositories/factoryRepository.js";

export class FactoryService {
  constructor(private factoryRepository: FactoryRepository) {}

  getFactories = async () => {
    return this.factoryRepository.findAllWithPrinters();
  };
}
