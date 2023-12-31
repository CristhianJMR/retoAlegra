const api = axios.create(
  {
    baseURL: "https://migmrgj2r3.execute-api.us-east-2.amazonaws.com/"
  }
)

const getKitchenStatus = async () => {
    try {
      const response = await api.get("/get-kitchen-status");
      const data = response.data;
  
      const inProgressElement = document.getElementById('inProgress');
      inProgressElement.textContent = data.inProgress;
  
      const completedElement = document.getElementById('completed');
      completedElement.textContent = data.completed;
    } catch (error) {
      console.error('Error al obtener el estado de la cocina:', error);
      
    }
  };
  
  // Función para obtener el inventario de alimentos y mostrarlo en la tabla
  const getFoodInventory = async () => {
    try {
      const response = await api.get('get-food-inventory');
      const data = response.data;
  
      const inventoryBody = document.getElementById('inventoryBody');
      inventoryBody.innerHTML = '';
  
      data.forEach((ingredient) => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = ingredient.name;
        const quantityCell = document.createElement('td');
        quantityCell.textContent = ingredient.quantity;
        row.appendChild(nameCell);
        row.appendChild(quantityCell);
        inventoryBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener el inventario de alimentos:', error);
      
    }
  };
  
  // Función para obtener el historial de compras y mostrarlo en la tabla
  const getPurchaseHistory = async () => {
    try {
      const response = await api.get('/get-purchase-history');
      const data = response.data;
  
      const historyBody = document.getElementById('historyBody');
      historyBody.innerHTML = '';
  
      data.forEach((purchase) => {
        const row = document.createElement('tr');
        const ingredientCell = document.createElement('td');
        ingredientCell.textContent = purchase.ingredient;
        const quantityCell = document.createElement('td');
        quantityCell.textContent = purchase.quantity;
        const timestampCell = document.createElement('td');
        timestampCell.textContent = purchase.timestamp;
        row.appendChild(ingredientCell);
        row.appendChild(quantityCell);
        row.appendChild(timestampCell);
        historyBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener el historial de compras:', error);
      
    }
  };
  
  // Función para obtener el historial de pedidos y mostrarlo en la tabla
  const getOrderHistory = async () => {
    try {
      const response = await api.get('/get-kitchen-orders');
      const data = response.data;
  
      const orderBody = document.getElementById('orderBody');
      orderBody.innerHTML = '';
  
      data.forEach((order) => {
        const row = document.createElement('tr');
        const recipeCell = document.createElement('td');
        recipeCell.textContent = order.recipe;
        const ingredientsCell = document.createElement('td');
        ingredientsCell.textContent = order.ingredients;
        const timestampCell = document.createElement('td');
        timestampCell.textContent = order.timestamp;
        row.appendChild(recipeCell);
        row.appendChild(ingredientsCell);
        row.appendChild(timestampCell);
        orderBody.appendChild(row);
      });
    } catch (error) {
      console.error('Error al obtener el historial de pedidos:', error);
     
    }
  };
  
  // Función para realizar un nuevo pedido
  const makeOrder = async () => {
    try {
      const response = await api.post('/handle-order');
  
      if (response.status == 200 ) {
        alert('Pedido realizado con éxito');
        // Actualizamos el estado de la cocina después de hacer un pedido exitoso
        getKitchenStatus();
        // Actualizamos el inventario de la cocina después de hacer una compra exitosa
        getFoodInventory();
        // Actualizamos el historial de compras después de hacer una compra exitosa
        getPurchaseHistory();
        // Actualizamos el historial de pedidos después de hacer un pedido exitoso
        getOrderHistory();
        
        


      } else {
        const data = await response.data;
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      alert('Comprando ingredientes en la plaza');
    }
  };
  
  // Event listener para el botón "Realizar Pedido"
  const orderButton = document.getElementById('orderButton');
  orderButton.addEventListener('click', makeOrder);
  
  // Mostrar los datos al cargar la página


getFoodInventory();
 