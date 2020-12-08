"use strict"
var drumSequencer = {};

var lane_sounds = {
    'lane1': new Audio('audio/Kick.mp3'),
    'lane2': new Audio('audio/Snare.mp3'),
    'lane3': new Audio('audio/Floor-Tom.mp3'),
    'lane4': new Audio('audio/hh_open.mp3'),
    'lane5': new Audio('audio/hh_closed.mp3')
};

var lane1 = document.getElementById('lane1');
var lane2 = document.getElementById('lane2');
var lane3 = document.getElementById('lane3');
var lane4 = document.getElementById('lane4');
var lane5 = document.getElementById('lane5');

var lanes = document.getElementsByClassName('drum_container');
var sound_types = document.getElementsByClassName('sound_type');

var lane_length = lane1.childElementCount;

var current_column = 0;

drumSequencer.drum_interval = null;

drumSequencer.onOffButton = function(event)
    {
    if (this.classList.contains('sound_on'))
        this.classList.remove('sound_on');
    else
        this.classList.add('sound_on');
    };

var buttons = document.getElementsByClassName("buttons");

for (var index = 0 ; index < buttons.length ; ++index)
    {
        var current_button = buttons[index];
        current_button.addEventListener('click',drumSequencer.onOffButton);
    }

    
    drumSequencer.drum_interval_time = 400;
    
    var bpm_button = document.getElementById('bpm_button');
    var bpm = document.getElementById('bpm');
    
    drumSequencer.changeBPM = function(event)
    {
        if(bpm.value > 999)
        bpm.value = 999;
        if(bpm.value < 90)
        bpm.value = 90;
        drumSequencer.setBPM(bpm.value);
    };
    
    bpm_button.addEventListener('click', drumSequencer.changeBPM);
    
    drumSequencer.setBPM = function(new_bpm)
    {
        if (!new_bpm)
        return;
        drumSequencer.drum_interval_time = 60000/new_bpm;
        drumSequencer.pause();
        drumSequencer.start();
    };
    
    drumSequencer.start = function()
    {
        if (drumSequencer.drum_interval === null)
        {
            drumSequencer.drum_interval = setInterval(drumSequencer.Sequencer,drumSequencer.drum_interval_time);
        }
    };
    
    drumSequencer.pause = function()
    {
        clearInterval(drumSequencer.drum_interval);
        drumSequencer.drum_interval = null;
    };
    
    drumSequencer.restart = function()
    {
        clearInterval(drumSequencer.drum_interval);
        location.reload();
    };
    
    drumSequencer.Sequencer = function()
    {
        for (var index = 0 ; index < lanes.length ; ++index)
        {
            var current_lane = lanes[index];
            var lane_toggled = sound_types[index].classList.contains('lane_toggle');
            var current_button = current_lane.children[current_column];
            var previous_button;
            if (current_column > 0)
            previous_button = current_lane.children[current_column-1];
            else
            previous_button = current_lane.children[lane_length-1];
            current_button.classList.add('active');
            previous_button.classList.remove('active');
            
            if (current_button.classList.contains('sound_on') && !lane_toggled)
            {
                var audio_file = lane_sounds[current_lane.id];
                if (audio_file)
                {
                    audio_file.pause();
                    audio_file.currentTime = 0;
                    audio_file.play();
                }
            }
        }
        console.log("next sequence");
        ++current_column;
        if (current_column >= lane_length)
        current_column = 0;
    };
    
    drumSequencer.laneToggle = function(event)
    {
        if (this.classList.contains('lane_toggle'))
        this.classList.remove('lane_toggle');
        else
        this.classList.add('lane_toggle');
    };
    
    for (var i = 0 ; i < sound_types.length ; ++i)
    sound_types[i].addEventListener('click',drumSequencer.laneToggle);
    
var startButton = document.getElementById("start").addEventListener('click',drumSequencer.start);
var pauseButton = document.getElementById("pause").addEventListener('click',drumSequencer.pause);
var restartButton = document.getElementById("restart").addEventListener('click',drumSequencer.restart);

if (window.innerHeight > window.innerWidth) {
    portrait = true;
} else {
    portrait = false;
}