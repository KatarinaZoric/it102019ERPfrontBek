using ErpPopravni.Models;
using ErpPopravni.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ErpPopravni.Services
{
    public interface IOrderService
    {
        public Order makeOrder(int userID);
        public List<OrderItem> getItems(OrderDTO [] items, int orderId);
    }
}
