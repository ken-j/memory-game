var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'],
		opened = [],
		match = 0,
		moves = 0,
        $deck = jQuery('.deck'),
        $winner = $('#winner'),
		$scorePanel = $('#score-panel'),
		$moveNum = $('.moves'),
		$ratingStars = $('i'),
		$restart = $('.restart'),
		delay = 800,
		gameCardsQTY = symbols.length / 2,
		rank3stars = gameCardsQTY + 2,
		rank2stars = gameCardsQTY + 6,
		rank1stars = gameCardsQTY + 10;

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
	
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function initGame() {
    console.log('game initGame');
  var cards = shuffle(symbols);
  $deck.empty();
  match = 0;
  moves = 0;
  $moveNum.text('0');
  $ratingStars.removeClass('fa-star-o').addClass('fa-star');
	for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
	}
	addCardListener();
};

function setRating(moves) {
	var rating = 3;
	if (moves > rank3stars && moves < rank2stars) {
		$ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
		rating = 2;
	} else if (moves > rank2stars && moves < rank1stars) {
		$ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
		rating = 1;
	} else if (moves > rank1stars) {
		$ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
		rating = 0;
	}	
	return { score: rating };
};

function endGame(moves, score) {
    $winner.append($('<p>Winner, With ' + moves + ' Moves and ' + score + ' Stars.</p>'))
}

$restart.bind('click', function() {
  initGame();
});

var addCardListener = function() {
console.log('addCardListener');
// Card flip
$deck.find('.card:not(".match, .open")').bind('click' , function() {
	if($('.show').length > 1) { return true; }
	
	var $this = $(this);
    
    var card = $this.children().attr('class');
    
  $this.addClass('open show');
	opened.push(card);

  if (opened.length > 1) {
    if (card === opened[0]) {
      $deck.find('.open').addClass('match animated infinite rubberBand');
      setTimeout(function() {
        $deck.find('.match').removeClass('open show animated infinite rubberBand');
      }, delay);
      match++;
    } else {
      $deck.find('.open').addClass('notmatch animated infinite wobble');
			setTimeout(function() {
				$deck.find('.open').removeClass('animated infinite wobble');
			}, delay / 1.5);
      setTimeout(function() {
        $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
      }, delay);
    }
    opened = [];
		moves++;
		setRating(moves);
		$moveNum.html(moves);
  }
	
	
	if (gameCardsQTY === match) {
		setRating(moves);
		var score = setRating(moves).score;
		setTimeout(function() {
			endGame(moves, score);
		}, 500);
  }
});
};

initGame();
