function Observable (raw) {
	return new ObservableObject(raw);
}

(c || window).Observable = Observable;