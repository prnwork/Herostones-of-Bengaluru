// Simple vanilla JS multi-select dropdown with checkboxes
// Usage: multiSelectDropdown(selectElement)
function multiSelectDropdown(selectElement) {
    // Hide the original select
    selectElement.style.display = 'none';
    // Create wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'ms-dropdown-wrapper';
    wrapper.style.position = 'relative';
    // Create button
    var button = document.createElement('button');
    button.type = 'button';
    button.className = 'ms-dropdown-btn';
    button.textContent = 'Select...';
    button.style.width = '100%';
    button.style.textAlign = 'left';
    button.style.padding = '6px 8px';
    button.style.border = '1px solid #bbb';
    button.style.borderRadius = '4px';
    button.style.background = '#f9f9f9';
    button.style.cursor = 'pointer';
    // Create dropdown
    var dropdown = document.createElement('div');
    dropdown.className = 'ms-dropdown-list';
    dropdown.style.position = 'absolute';
    dropdown.style.left = '0';
    dropdown.style.right = '0';
    dropdown.style.background = '#fff';
    dropdown.style.border = '1px solid #bbb';
    dropdown.style.borderTop = 'none';
    dropdown.style.zIndex = '1000';
    dropdown.style.display = 'none';
    dropdown.style.maxHeight = '180px';
    dropdown.style.overflowY = 'auto';
    // Add options as checkboxes
    for (var i = 0; i < selectElement.options.length; i++) {
        var opt = selectElement.options[i];
        if (!opt.value) continue; // skip empty option
        var item = document.createElement('label');
        // Use flexbox for alignment
        item.style.display = 'flex';
        item.style.alignItems = 'center';
        item.style.padding = '4px 8px';
        item.style.cursor = 'pointer';
        item.style.gap = '8px';
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = opt.value;
        checkbox.checked = opt.selected;
        checkbox.style.margin = '0 8px 0 0';
        checkbox.style.verticalAlign = 'middle';
        checkbox.style.width = '16px';
        checkbox.style.height = '16px';
        checkbox.onchange = function() {
            for (var j = 0; j < selectElement.options.length; j++) {
                if (selectElement.options[j].value == this.value) {
                    selectElement.options[j].selected = this.checked;
                }
            }
            updateButtonText();
            if (typeof selectElement.onchange === 'function') selectElement.onchange();
        };
        item.appendChild(checkbox);
        var textSpan = document.createElement('span');
        textSpan.textContent = opt.text;
        textSpan.style.flex = '1';
        item.appendChild(textSpan);
        dropdown.appendChild(item);
    }
    // Show/hide dropdown
    button.onclick = function(e) {
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        e.stopPropagation();
    };
    // Hide dropdown on outside click
    document.addEventListener('click', function() {
        dropdown.style.display = 'none';
    });
    wrapper.appendChild(button);
    wrapper.appendChild(dropdown);
    selectElement.parentNode.insertBefore(wrapper, selectElement);
    // Update button text
    function updateButtonText() {
        var selected = [];
        for (var i = 0; i < selectElement.options.length; i++) {
            if (selectElement.options[i].selected && selectElement.options[i].value) {
                selected.push(selectElement.options[i].text);
            }
        }
        button.textContent = selected.length ? selected.join(', ') : 'Select...';
    }
    updateButtonText();
}
// Apply to all .filterselect > select except slider
window.addEventListener('DOMContentLoaded', function() {
    var selects = document.querySelectorAll('.filterselect select');
    selects.forEach(function(sel) {
        multiSelectDropdown(sel);
    });
});
