$(document).ready(function() {

	var x = "x"
	var o = "o"
	var count = 0;
	var o_win = 0;
	var x_win = 0;
	var xWonCountLabel = $('#x_win');
	var oWonCountLabel = $('#o_win');
	$('#btnSubmitBoxValue').click(function() {
		totalBox = parseInt($('#boxTotal').val());

		if(isNaN(totalBox) || totalBox < 2)
		{
			alert('Try more than 3');
			return false;
		}
		else
		{
			$('#boxGame').css("display", "block");
			$('#inputBoxValue').css("display", "none");
			$('#restartSection').css("display", "block");
		}

		var totalBlocks = Math.pow(totalBox, 2);

		const gameState = new Array(totalBox * 2 + 2);
		gameState.fill(0);
		let playerMove = 0;
    let gameDone = false;

		$('#game').css('width', totalBox * 82 + 'px');
		$('#game').html('');
		let row = 0;
		let column = 0;
		var tes = '';
		for(let i=1; i<=totalBlocks; i++){
			if(column >= totalBox) column = 0;

      tes += "<li data-row='"+ row +"' data-column='"+ column +"' class='btn span1'>+</li>";
      $('#game').html(tes);

      column++;
      if (i % totalBox === 0) row += 1;
      console.log('hasil ', i % totalBox);
		}

		var countBox = $('#game li');

		for(let j=0; j<countBox.length; j++){
			countBox[j].addEventListener('click', function () {

				if(gameDone) {
					alert('The game is finish');
				}else {
					if(this.innerHTML === 'x' || this.innerHTML === 'o') {
						alert('try another box');
						return false;
					} else {
	          const row = parseInt($(this).data('row'));
	          const column = parseInt($(this).data('column'));
	          if (playerMove % 2 === 0) {
	          	$(this).addClass('disable o btn-primary');
	            this.innerHTML = 'o';
	            winner('o', row, column);
	          } else {
	            $(this).addClass('disable x btn-info');
	            this.innerHTML = 'x';
	            winner('x', row, column);
	          }

	          playerMove++;
	        }
				}
			});
		}

		function winner(player, row, column) {
			let playerValidate = (player === 'x') ? 1 : -1;

			gameState[row] += playerValidate;

			gameState[totalBox + column] += playerValidate;

			if(row === column) {
				gameState[2 * totalBox] += playerValidate;
			}

			if(row + column === totalBox - 1) {
				gameState[2 * totalBox + 1] += playerValidate;
			}

			const xWins = gameState.indexOf(totalBox);
			const oWins = gameState.indexOf(-totalBox);

			if(xWins >= 0) {
				gameDone = true;
				x_win += 1;
				xWonCountLabel.html(x_win);
				alert('X Won');
				return true;
			} else if (oWins >= 0) {
				gameDone = true;
				o_win += 1;
				oWonCountLabel.html(o_win);
				alert('O Won');
				return true;
			}

			if(playerMove === totalBlocks - 1) {
				gameDone = true;
				alert("draw");
				return false;
			}
		}
	})

  $("#reset").click(function () {
		$("#game li").text("+");
		$("#game li").removeClass('disable')
		$("#game li").removeClass('o')
		$("#game li").removeClass('x')
		$("#game li").removeClass('btn-primary')
		$("#game li").removeClass('btn-info')
		$('#boxGame').css("display", "none");
		$('#inputBoxValue').css("display", "block");
		$('#restartSection').css("display", "none");
		count = 0
	});
});
