function Knot (props) {
	for (var p in props) if (props.hasOwnProperty(p)) {
		this[p] = props[p];
	}
	this.type = 'knot';

	if (!this.isKnot(this.raw)) {
		return;
	}

	this.val = new KnotValueClass();
	this.createObservableNodeProperty();
	this.createNodeFromRaw(this.raw);
}

Knot.prototype = Object.create(Node.prototype);

Knot.prototype.isKnot = function (raw) {
	return this.getNodeRawType(raw) == this.type;
};