var board, player, won, turn_count;
reset();

function reset() {
	document.getElementById("result").innerHTML = '\u00A0';
	document.getElementById("reset").style.visibility = "hidden";

	var elems = document.getElementsByClassName("cell");
	for (var i=0;i<elems.length;i++) { elems[i].innerHTML = '\u00A0'; }

	board = [[null,null,null],[null,null,null],[null,null,null]];
	player = 'X';
	won = false;
	turn_count = 0;
}

function flip_player() {
	if (player == 'O') {
		player = 'X';
		return 'X';
	} // else
	if (player == 'X') {
		player = 'O';
		return 'O';
	} // otherwise
	console.error('invalid function argument');
}

function update_board(s, player) {
	var y = parseInt(s[0]);
	var x = parseInt(s[2]);
	if (!board[y][x]) {
		board[y][x] = player;
		document.getElementById(s).innerHTML = player;
		return flip_player(player);
	} // otherwise
	return player;
}

function is_winning_sequence(stack) {
	return stack.length == 3 &&
		(!stack.includes(null) &&
			!(stack.includes('X') && stack.includes('O')));
}

function winner() {
	var stack = [];
	var i, j;
	for (i=0;i<3;i++) {
		stack = [];
		for (j=0;j<3;j++) {
			stack.push(board[i][j]);
			if (is_winning_sequence(stack)) return stack[0];
		}
	}

	stack = [];
	for (i=0;i<3;i++) {
		stack = [];
		for (j=0;j<3;j++) {
			stack.push(board[j][i]);
			if (is_winning_sequence(stack)) return stack[0];
		}
	}

	stack = [];
	i = 0;
	j = 0;
	while (i < 3 && j < 3) {
		stack.push(board[i][j]);
		if (is_winning_sequence(stack)) return stack[0];
		i++;
		j++;
	}

	stack = [];
	i = 2;
	j = 0;
	while (i > -1 && j < 3) {
		stack.push(board[i][j]);
		if (is_winning_sequence(stack)) return stack[0];
		i--;
		j++;

	}

	return null;
}

function turn(s) {
	if (!won) {
		update_board(s, player);
		var w = winner();
		if (w) {
			won = true;
			document.getElementById("result").innerHTML = w + " wins!";
			document.getElementById("reset").style.visibility = "visible";
		}
		if (turn_count == 8) {
			document.getElementById("result").innerHTML = "Draw";
			document.getElementById("reset").style.visibility = "visible";
		}
	}
	turn_count++;
}