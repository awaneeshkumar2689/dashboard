let widgetCount = 0;
let categories = {
    "categories": [
        {
            "name": "CSPM Executive Dashboard",
            "widgets": [
                {
                    "name": "Widget 1",
                    "text": "Random text for Widget 1"
                },
                {
                    "name": "Widget 2",
                    "text": "Random text for Widget 2"
                }
            ]
        },
        {
            "name": "Another Category",
            "widgets": [
                {
                    "name": "Widget A",
                    "text": "Random text for Widget A"
                }
            ]
        }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
});

function loadCategories() {
    const categoryContainer = document.getElementById('categories');
    categoryContainer.innerHTML = '';
    categories.categories.forEach((category, catIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';
        categoryDiv.innerHTML = `
            <h2>${category.name}</h2>
            <button class="addCategory btn btn-primary my-5 text-light" onclick="addWidget(${catIndex})">+ Add Widget</button>
            <div id="category-${catIndex}"></div>
        `;
        categoryContainer.appendChild(categoryDiv);
        category.widgets.forEach((widget, widgetIndex) => {
            addWidgetToCategory(catIndex, widget.name, widget.text);
        });
    });
}

function addWidget(catIndex) {
    const widgetName = prompt("Enter widget name:");
    const widgetText = prompt("Enter widget text:");
    if (widgetName && widgetText) {
        categories.categories[catIndex].widgets.push({ name: widgetName, text: widgetText });
        addWidgetToCategory(catIndex, widgetName, widgetText);
    }
}

function addWidgetToCategory(catIndex, widgetName, widgetText) {
    const categoryDiv = document.getElementById(`category-${catIndex}`);
    const widget = document.createElement('div');
    widget.className = 'widget';
    widget.id = `widget-${widgetCount}`;
    widget.innerHTML = `
        <span class="remove addCategory btn btn-danger" onclick="removeWidget(${catIndex}, ${widgetCount})">X</span>
        <h3 contenteditable="true" onblur="renameWidget(${widgetCount})">${widgetName}</h3>
        <p contenteditable="true">${widgetText}</p>                                                                   
        <input type="file" onchange="attachPicture(event, ${widgetCount})">
        <img id="icon-${widgetCount}" class="icon" style="display:none;">
        <button class="addCategory btn btn-primary my-5 text-light" onclick="removeIcon(${widgetCount})">Remove Icon</button>
    `;
    categoryDiv.appendChild(widget);
    widgetCount++;
}

function removeWidget(catIndex, widgetId) {
    const widget = document.getElementById(`widget-${widgetId}`);                
    widget.remove();
    categories.categories[catIndex].widgets = categories.categories[catIndex].widgets.filter((_, index) => index !== widgetId);
}                                                                                                                                                 
function removeWidget(catIndex, widgetId) {
    const widget = document.getElementById(`widget-${widgetId}`);
    widget.remove();
    categories.categories[catIndex].widgets = categories.categories[catIndex].widgets.filter((_, index) => index !== widgetId);
}

function renameWidget(id) {
    const widget = document.getElementById(`widget-${id}`);
    const newName = widget.querySelector('h3').innerText;
    console.log(`Widget ${id} renamed to: ${newName}`);
}

function attachPicture(event, id) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        const img = document.getElementById(`icon-${id}`);
        img.src = e.target.result;
        img.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function removeIcon(id) {
    const img = document.getElementById(`icon-${id}`);
    img.src = '';
    img.style.display = 'none';
    console.log(`Icon removed from Widget ${id}`);
}

function searchWidgets() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const widgets = document.getElementsByClassName('widget');
    for (let i = 0; i < widgets.length; i++) {
        const widget = widgets[i];
        const name = widget.querySelector('h3').innerText.toUpperCase();
        if (name.indexOf(input) > -1) {
            widget.style.display = '';
        } else {
            widget.style.display = 'none';
        }
    }
}

function addCategory() {
    const categoryName = prompt("Enter category name:");
    if (categoryName) {
        categories.categories.push({ name: categoryName, widgets: [] });
        loadCategories();
    }
}
function removeCategory() {
    const categoryName = prompt("Enter category name:");
    if (categoryName) {
        categories.categories.pop({ name: categoryName, widgets: [] });
        loadCategories();
    }
}
