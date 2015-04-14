function Leaf (props) {
	for (var p in props) if (props.hasOwnProperty(p)) {
		this[p] = props[p];
	}
	this.type = 'leaf';
	
	if (!this.isLeaf(this.raw[this.name])) {
		return;
	}

	this.val = this.raw[this.name];
	this.createObservableNodeProperty();
}

Leaf.prototype = Object.create(Node.prototype);

Leaf.prototype.isLeaf = function (raw) {
	return this.getNodeRawType(raw) == this.type;
};