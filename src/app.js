function Observe (raw) {
	debugger;
	return new ObservableObject(raw);
}

(c || window).Observe = Observe;