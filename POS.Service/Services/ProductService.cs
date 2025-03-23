using POS.Repository.Repositories;
using POS.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using POS.Repository.Interfaces;
using POS.Domain.Models.SalesOrders;

namespace POS.Service.Services
{
    public class ProductService:IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task CreateProduct(Product product)
        {
            await _productRepository.AddAsync(product);
        }

        public async Task DeleteProduct(Product product)
        {
            await _productRepository.DeleteAsync(product);
        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return await _productRepository.GetAllAsync();
        }

        public async Task<Product> GetProductById(int id)
        {
            return await _productRepository.GetByIdAsync(id);
        }

        public async Task UpdateProduct(Product product)
        {
            await _productRepository.UpdateAsync(product);
        }
    }
}
