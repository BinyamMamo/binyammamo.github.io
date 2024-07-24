let responseText = `Ed Sheeran - Perfect (Official Music Video) Subtitle (.SRT)
0
00:00:00,000 --> 00:00:00,000
Ed Sheeran - Perfect

1
00:00:20,300 --> 00:00:26,000
I found a love for me

2
00:00:27,800 --> 00:00:30,400
Darling just dive right in

3
00:00:31,600 --> 00:00:33,900
And follow my lead

4
00:00:35,400 --> 00:00:42,000
Well I found a girl beautiful
and sweet

5
00:00:42,900 --> 00:00:49,300
I never knew you were the
someone waiting for me

6
00:00:49,400 --> 00:00:54,100
'Cause we were just kids
when we fell in love

7
00:00:54,300 --> 00:00:58,000
Not knowing what it was

8
00:00:58,100 --> 00:01:05,650
I will not give you up this time

9
00:01:05,700 --> 00:01:12,900
But darling, just kiss me slow,
your heart is all I own

10
00:01:13,000 --> 00:01:19,100
And in your eyes you're holding mine

11
00:01:20,000 --> 00:01:31,100
Baby, I'm dancing in the dark
with you between my arms

12
00:01:31,200 --> 00:01:38,200
****foot on the grass, listening
to our favorite song

13
00:01:38,300 --> 00:01:45,300
When you said you looked a mess, I
whispered underneath my breath

14
00:01:45,400 --> 00:01:53,300
But you heard it, darling,
you look perfect tonight

15
00:01:58,600 --> 00:02:05,600
Well I found a woman, stronger
than anyone I know

16
00:02:06,200 --> 00:02:13,700
She shares my dreams, I hope that
someday I'll share her home

17
00:02:13,800 --> 00:02:21,800
I found a love, to carry more
than just my secrets

18
00:02:21,900 --> 00:02:28,100
To carry love, to carry
children of our own

19
00:02:28,200 --> 00:02:32,700
We are still kids, but
we're so in love

20
00:02:32,800 --> 00:02:36,500
Fighting against all odds

21
00:02:36,600 --> 00:02:44,100
I know we'll be alright this time

22
00:02:44,200 --> 00:02:47,600
Darling, just hold my hand

23
00:02:47,700 --> 00:02:51,600
Be my girl, I'll be your man

24
00:02:51,700 --> 00:02:58,100
I see my future in your eyes

25
00:02:58,400 --> 00:03:09,600
Baby, I'm dancing in the dark,
with you between my arms

26
00:03:09,700 --> 00:03:16,700
****foot on the grass, listening
to our favorite song

27
00:03:16,800 --> 00:03:22,700
When I saw you in that dress,
looking so beautiful

28
00:03:22,800 --> 00:03:31,400
I don't deserve this, darling,
you look perfect tonight

29
00:03:43,800 --> 00:03:55,000
Baby, I'm dancing in the dark,
with you between my arms

30
00:03:55,100 --> 00:04:02,000
****foot on the grass, listening
to our favorite song

31
00:04:02,100 --> 00:04:05,400
I have faith in what I see

32
00:04:05,500 --> 00:04:11,800
Now I know I have met
an angel in person

33
00:04:11,900 --> 00:04:15,700
And she looks perfect

34
00:04:15,800 --> 00:04:19,700
I don't deserve this

35
00:04:19,800 --> 00:04:24,300
You look perfect tonight

36
00:04:25,300 --> 00:04:34,300
by RentAnAdviser.com
`
// TODO -- THINK ABOUT ADDING A FLAG TO CHECK IF LYRICS IS LOADED BEFORE PLAYING THE MUSIC
//      -- check if the music has started playing before allowing the user to type
// let DEFAULT_TEXT = "Lorem ipsum dolor sit amet consectetur adipisicing elit";
let DEFAULT_TEXT = '...'; // "♪"
let textboxContent = DEFAULT_TEXT;

const WHITESPACE_OPTIONS = ['·', '&nbsp;', '_'];
const WHITESPACE = WHITESPACE_OPTIONS[1];

const EOL = '\n'; // <br>
let lyrics = [];
let TITLE = '';

const vid = document.getElementById('music-video');
const textbox = document.getElementById('lyrics-container');
const wpm = document.getElementById('wpm');
let wpm_array = [];

let interval_id = null;
const SPEED = 1.0;
const capitals = false;
const punctuation = false;
const double_spaces = false;

$(document).ready(function () {
  // console.clear();

  // loading();  // TODO: check if no need and remove it
  $('.overlay-loader').show();

  // fetch('/uploads/lyrics.txt').then((res) => res.text()).then((res) => {
  // 	console.log(res);
  // })

      let response = responseText;
      response = response.split('\n');

      console.log('response', response);
      TITLE = response[0].split('(')[0];

      for (let i = 1; i < response.length; i++) {
        let id = response[i];
        i++;

        let stamp = response[i];
        stamp = stamp.split(' --> ')[0];
        i++;

        let verse = '';
        while (response[i] != '') {
          verse += response[i] || '';
          verse += EOL;
          i++;
        }

        lyrics.push({
          id,
          stamp,
          verse,
        });
      }

      let line = TITLE; // TODO = TITLE
      fillTextBox(line);
      $('#play').show();

});

function playMusic(btn) {
  let musicId = btn.dataset.id;

  $('.lyrics-container').show();
  $('.keyboard-container').show();
  $('.overlay-loader').hide();
  begin_music();
}

function begin_music() {
  vid.controls = false;
  vid.playbackRate = SPEED;

  vid.play();

  interval_id = setInterval(timer, 100);
}

function fillTextBox(line) {
  cursor = 0;
  line = parse(line);
  textboxContent = line;
  textboxContent = textboxContent.replace(/\n/g, '<br>');
  textbox.innerHTML = '';

  for (let i = 0; i < line.length; i++) {
    let char = document.createElement('char');
    if (i == cursor) char.classList = ['char cursor'];
    else char.classList = ['char'];

    if (line[i] != '\n') {
      char.innerHTML = line[i] == ' ' ? WHITESPACE : line[i];
      textbox.appendChild(char);
    } else textbox.appendChild(document.createElement('br'));
  }
  // let curr = document.getElementsByClassName("cursor")[0];
  // curr.classList.remove("cursor");
  if (textbox.childNodes.length > 0)
    textbox.childNodes[0].classList.add('cursor');
  // console.log(textbox.childNodes[0])
}

let previous_time = 0;
let finished = false;
document.body.ondblclick = (ev) => {
  ev.preventDefault();
  pauseEverything(ev);
};

document.addEventListener('keydown', function (event) {
	if (event.key === 'Escape' || event.key === 'Enter') {
		console.log('Escape key pressed');
		event.preventDefault();
		pauseEverything(event);
  }
});

function pauseEverything(ev) {
  if (vid && vid.paused) {
    vid.play();
    console.log('played');
    timer();
    interval_id = setInterval(timer, 100);
    $('.keyboard-container').show();
		$('.stats-container').hide();
  } else if (vid) {
    vid.pause();
    console.log('paused');
    clearInterval(interval_id);
    interval_id = null;
    let averagey =
      wpm_array.reduce(
        (accumulator, currentValue) =>
          accumulator + (isNaN(currentValue) ? 0 : currentValue),
        0
      ) / wpm_array.length;
    $('.stats-container .wpm-display').text(`${Math.round(averagey)} wpm`);
    $('.stats-container').show();
    $('.keyboard-container').hide();

    $('.stats-container .close-stats').on('click', function (e) {
      e.preventDefault();
      console.log('time', time);
      if (!interval_id) {
        interval_id = setInterval(timer, 100);
      }
      if (vid.paused) vid.play();
      $('.stats-container').hide();
      $('.keyboard-container').show();
    });
  }
}

document.addEventListener('keypress', (ev) => {
  if (cursor >= textboxContent.length) {
    console.log('FINISHED!!!');
  } else if (ev.key == textboxContent[cursor]) {
    let curr = document.getElementsByClassName('cursor')[0];
    curr.classList.remove('cursor');
    curr.classList.add('done');
    if (curr.nextElementSibling) {
      curr.nextElementSibling.classList.add('cursor');
      // console.log(curr);
      cursor += 1;
    } else {
      console.log('FINISHED!!!');
      update_wpm();
      finished = true;
    }
  }
});

function update_wpm() {
  // let words = textboxContent.split(" ").length;
  let words = cursor;
  let wpm_count = 0;
  wpm_count = words / (time - previous_time);
  wpm_count *= 60000;
  wpm_count /= 5;

  previous_time = time;

  if (isNaN(wpm_count) || wpm_count === Number.POSITIVE_INFINITY) wpm_count = 0;
  // wpm.innerHTML = `${Math.floor(wpm_count)}WPM`;

  wpm_array.push(wpm_count);
}

function parse(line) {
  // line = line.replace(/\n/g, "newlinenewlinenewline");
  line = line.replace(/\n/g, ' ');
  line = line.replace(/^ /, '');
  line = line.replace(/ $/, '');

  if (!capitals) line = line.toLowerCase();
  if (!punctuation) {
    line = line.replace(/[^(a-z| |\n)]/g, '');
    line = line.replace(/\(/g, '');
    line = line.replace(/\)/g, '');
  }
  if (!double_spaces) {
    line = line.trim().replace(/\n+/g, '\n');
    line = line.replace(/  +/g, ' ');
    line = line.replace(/\n /g, '\n');
    line = line.replace(/ \n/g, '\n');
  }

  return line;
}

let watchHour = 0;
let time = 0;
let curr = -1;
function timer() {
  const time_cont = document.getElementById('timer');

  sec = time / 1000;
  min = Math.floor(sec / 60);
  let output = '';

  sec = sec % 60;

  if (min < 10) output += `0${min}`;
  else output += `${min}`;

  output += ':';

  if (sec < 10) output += `0${Math.floor(sec)}`;
  else output += `${Math.floor(sec)}`;

  let stamp = null;
  // if (curr + 1 < lyrics.length) stamp = lyrics[curr + 1].stamp;
  if (curr + 1 < lyrics.length) stamp = lyrics[curr + 1].stamp;
  else {
    let averagey =
      wpm_array.reduce(
        (accumulator, currentValue) =>
          accumulator + (isNaN(currentValue) ? 0 : currentValue),
        0
      ) / wpm_array.length;
    console.log('FINALLY WE HAVE FINISHED');
    document.body.ondblclick = null;

		let score = Math.min(Math.max(parseInt(averagey), 1), 100);

    $('.keyboard-container').hide();
    $('.ratings-parent').show();
    $('.stats-container .wpm-display').text(`${Math.round(averagey)} wpm`);

    console.log('Average wpm:', averagey);
    fillTextBox(averagey.toString());
    // container.innerHTML = `WPM: ${averagey}`;
    clearInterval(interval_id);
    return;
  }
  stamp = stamp.split(':');

  let lyrics_time = parseInt(stamp[0] * 3600);
  lyrics_time += parseInt(stamp[1] * 60);
  lyrics_time *= 1000;
  lyrics_time += parseInt(stamp[2].replace(',', ''));

  // if ((time - 1500) * SPEED > lyrics_time) {
  if (time * SPEED > lyrics_time) {
    curr++;

    if (curr >= lyrics.length) {
      console.log('Finished!'); // FInal Finish
      const average =
        wpm_array.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        ) / wpm_array.length;
      fillTextBox(`WPM: ${average}`);
    } else {
      let line = lyrics[curr].verse;
      // console.log(line);

      if (!finished) {
        console.log('reached here: final');
        update_wpm();
      }
      finished = false;

      previous_time = time;
      fillTextBox(line);
    }
  }

  time_cont.innerHTML = output;
  // time += 1000 * SPEED;
  // time += 100 * SPEED;
  time += 100;
	watchHour += 100;
}

function do_seeking() {
  // console.log(vid.currentTime);
  time = vid.currentTime * 1000;
}

function do_seeked() {
  // console.log(vid.currentTime);
  timer();
}
