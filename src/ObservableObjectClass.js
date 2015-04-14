function ObservableObject (raw) {
	if (Node.prototype.getNodeRawType(raw) != 'knot') {
		return;
	}
	new Knot({
		raw: raw,
		super: this,
		name: 'val'
	});
}

ObservableObject.prototype.bubbleUpNodeEvent = function (event) {
	console.log(event);
};