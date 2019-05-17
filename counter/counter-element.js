const template = document.createElement('template');
template.innerHTML = `
	<p id="number"></p>
	<button id="add">add</button>
	<button id="sub">sub</button>
`;

class CounterElement extends HTMLElement {
	constructor () {
		super();
		this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));
		this._numberElement = this._shadowRoot.getElementById('number');
		this._shadowRoot.getElementById('add').addEventListener('click', this._add.bind(this));
		this._shadowRoot.getElementById('sub').addEventListener('click', this._sub.bind(this));
	}
	
	connectedCallback() {
		if (!this.hasAttribute('number') || isNaN(this.getAttribute('number'))) {
			this.setAttribute('number', 0);
		}
	}
	
	get number() {
		return parseInt(this.getAttribute('number'));
	}
	
	set number(val) {
		this.setAttribute('number', val);
	}
	
	_add() {
		this.number = this.number + 1;
	}
	
	_sub() {
		this.number = this.number - 1;
	}
	
	static get observedAttributes() {
		return ['number'];
	}
	
	_attributeChanges = {
		number: newValue => this._numberElement.innerText = newValue
	};
	
	attributeChangedCallback(name, oldValue, newValue) {
		const update = this._attributeChanges[name] ? this._attributeChanges[name] : () => {};
		
		update(newValue, oldValue);
	}
}

window.customElements.define('counter-element', CounterElement);