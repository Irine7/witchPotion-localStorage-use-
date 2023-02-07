const addItemsForm = document.querySelector('.add-items-form');
		const itemsList = document.querySelector('.items-list');
		const items = JSON.parse(localStorage.getItem('items')) || []; // Подтягиваем ингридиенты из localStorage и переводим обратно в массив (JSON.parse)

		function addItem(e) {
			e.preventDefault();
			console.log(e.target.item.value)

			// При добавлении нового элемента присваеваем его переменной:
			const text = e.target.item.value; //Это название каждого ингридиента
			const item = {
				text: text,
				checked: false,
			}
			// При каждом добавлении ингридиента добавляем его в пустой массив items:
			items.push(item);
			// Получаем доступ к localStorage (setItem записывает в localStorage):
			// В localStorage все записывается в строчном формате. Поэтому используем метод JSON.stringify чтобы перевести массив в строчный формат:
			localStorage.setItem('items', JSON.stringify(items)) // В скобках указываем ключ и содержимое, которые мы хотим записать
			displayItems(items, itemsList) // Вызываем функцию каждый раз когда добавляется новый ингридиент
			this.reset(); // Перезагрузка/очистка формы после добавления ингридиента
		}

		// Отображение ингридиентов на странице:
		function displayItems(ingredients, ingredientsList) {
		// console.log(ingredients, ingredientsList)
		ingredientsList.innerHTML = ingredients.map((ingredient, index) => {
				return `<li>
					<input type='checkbox'id='item${index}' data-index='${index}' ${ingredient.checked ? 'checked' : ''} />
					<label for='item${index}'>${ingredient.text}</label>
					</li>`;
			}).join('');
		}

		function toggleClick(e) {
			// Убираем все теги кроме input:
			if (!e.target.matches('input')) return; // Нам нужен только тег input
			// console.log(e.target)
			console.log(e.target.dataset.index)
			// Получаем id конкретного элемента:
			const element = e.target.dataset.index;
			// Берем массив, потом интекс элемента и свойство checked. А потом меняем его на противоположное значение:
			items[element].checked = !items[element].checked;
			localStorage.setItem('items', JSON.stringify(items));
			// Повторно отображаем обновленный массив items:
			displayItems(items, itemsList);
		}

		addItemsForm.addEventListener('submit', addItem);
		itemsList.addEventListener('click', toggleClick) // По клику запускается функция
		displayItems(items, itemsList) // Вызываем функцию при каждой перезагрузке страницы. внутри передаем заполненный массив и переменную 

