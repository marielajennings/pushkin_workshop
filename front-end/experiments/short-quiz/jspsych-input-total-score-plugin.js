
function definePlugin (){
var plugin = {};

plugin.info= {
	name: 'visualize-results',
	description:'This plugin makes your results more visually appealing!',
	parameters: {
	participant_score: {
        type: [jsPsych.plugins.parameterType.INTEGER],
        default: undefined,
        no_function: false,
        description: 'This is the score the participant got.'
      },
      possible_score: {
        type: [jsPsych.plugins.parameterType.INTEGER],
        default: undefined,
        no_function: false,
        description: 'This is the total possible score for the quiz.'
      }

	}

}

plugin.trial= function (display_element, trial) {

 trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);


var calculated_percent=(trial.participant_score/trial.possible_score)*100

var p = document.createElement('p');
p.setAttribute('style', 'text-align:center; margin-top:100px')

display_element.appendChild(p);
p.innerHTML="Your score: "+trial.participant_score+"/"+trial.possible_score+""
var div= document.createElement('div');
div.setAttribute('style','background-color:#ddd; width: 800px; height:40px; border-radius: 25px; margin-top:50px; margin:0 auto');
display_element.appendChild(div);
var div2 = document.createElement('div');
div2.setAttribute ("style","width:"+calculated_percent+"%; background-color:#00bcd4; border:00a5bb; text-align: right; padding-right: 20px; line-height: 40px; color: white; height:40px; border-radius: 25px;");
div.appendChild(div2);


var div3=document.createElement('div');
div3.setAttribute('style','margin-bottom:20px; margin-top:200px');
display_element.appendChild(div3);
var button = document.createElement('button');
button.setAttribute('type','button');
button.setAttribute('class','jspsych-btn');
display_element.appendChild(button);
button.innerHTML="Finish";
button.addEventListener('click', () => {jsPsych.finishTrial({})});


}
return plugin;
}

jsPsych.plugins['visualize-results'] = definePlugin() ;

