function Node () {}

Node.prototype = Object.create(ObservableObject.prototype);

Node.prototype.getNodeRawType = function (raw) {
	switch (Object.prototype.toString.call(raw).slice(8,-1)) {
		case 'Object':
			return 'knot';
			break;
		default:
			return 'leaf';
			break;
	}
};

Node.prototype.createNodeFromRaw = function (raw) {
	for (var p in raw) if (raw.hasOwnProperty(p)) {
		switch (this.getNodeRawType(raw[p])) {
			case 'knot':
				new Knot({
					raw: raw[p],
					super: this,
					name: p
				});
				break;

			case 'leaf':
				new Leaf({
					raw: raw,
					super: this,
					name: p
				});
				break;
		}
	}
};


Node.prototype.bubbleUpNodeEvent = function (event) {
	this.super.bubbleUpNodeEvent(event);
};

Node.prototype.createNodeEvent = function (type, name, before, after) {
	this.last_event = new NodeEvent({
		type: type,
		name: name,
		value: {
			before: before,
			after: after
		}
	});
	this.bubbleUpNodeEvent(this.last_event);
};


Node.prototype.lookupForAddedNodes = function () {
	for (var p in this.val) if (this.val.hasOwnProperty(p) && !this.raw[p]) {
		this.raw[p] = this.val[p];
		this.createNodeEvent('add', p, undefined, this.raw[p]);
		
		switch (this.getNodeRawType(this.raw[p])) {
				case 'knot':
					new Knot({
						raw: this.raw[p],
						super: this,
						name: p
					});	
					break;
				case 'leaf':
					new Leaf({
						raw: this.raw,
						super: this,
						name: p
					});	
					break;
		}
	}
};

Node.prototype.lookupForRemovedNodes = function () {
	var deleted;
	for (var p in this.raw) if (this.raw.hasOwnProperty(p) && !this.val[p]) {
		deleted = this.raw[p];
		delete this.raw[p];
		this.createNodeEvent('delete', p, deleted, undefined);
	}
};

Node.prototype.getNodeValue = function () {
	//console.log('get: ' + this.name);
	
	if (this.type == 'knot') {
		setTimeout(function () {
			this.lookupForAddedNodes();
			this.lookupForRemovedNodes();
		}.bind(this));
	}

	return this.val;
};

Node.prototype.setNodeValue = function (val) {
	//console.log('set: ' + this.name + '| was: ' + this.val + '| become: ' + val);
	
	this.raw[this.name] = val;

	if (this.val !== val) {
		this.createNodeEvent('update', this.name, this.val, val);			
	}

	switch (this.getNodeRawType(this.raw[this.name])) {
		case 'knot':
			new Knot({
				raw: this.raw[this.name],
				super: this.super,
				name: this.name
			});
			break;

		case 'leaf':
			this.val = val;	
			break;
	}
};

Node.prototype.createObservableNodeProperty = function () {
	debugger;
	Object.defineProperty(this.super.val || this.super, this.name, {
		get: this.getNodeValue.bind(this),
		set: this.setNodeValue.bind(this),
		configurable: 1
	});
};