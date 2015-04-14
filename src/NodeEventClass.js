function NodeEvent (props) {
	for (var p in props) if (props.hasOwnProperty(p)) {
		this[p] = props[p];
	}
	this.time = +new Date;
};