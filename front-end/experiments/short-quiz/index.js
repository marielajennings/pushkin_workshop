/* eslint-disable max-len */
/* This is standard for all experiments and just takes care of the positioning of the jsPsych container and stopping the experiment when it's over */
require('script-loader!../../jsPsych/jspsych.js');
require('script-loader!./jspsych-text.js');
require('script-loader!./jspsych-dropdown.js');
require('script-loader!./jspsych-conditional-run.js');
require('script-loader!./jspsych-survey-text.js');
require('script-loader!./jspsych-survey-multi-choice.js');
require('script-loader!./jspsych-input-total-score-plugin.js');

import React, { PropTypes } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { Link, browserHistory } from 'react-router';
import axiosShortQuiz from './axiosShortQuiz';
import baseUrl from '../../core/baseUrl';
import s from './short-quiz.css';

class ShortQuiz extends React.Component {
  constructor(props) {
    super();
    this.state = { loading: true };
    this.hideLoading = this.hideLoading.bind(this);
    this.onResize = this.onResize.bind(this);
    window.addEventListener('resize', this.onResize.bind(this));
    browserHistory.listen(location => {
      jsPsych.endExperiment();
      window.location.reload();
    });
  }
  hideLoading(props) {
    this.setState({ loading: false });
  }

  onResize() {
    const margin = document.getElementById('jsPsychTarget').style.marginTop = '50px';
  }


/* This is where the standard part ends and jsPsych stuff starts */
/*jsPsych functions */
  getTrials(stims, choices, correct) {

    let arr = [];
    let questions = {};

    for (let i in stims) {

      questions = {
        type: "survey-multi-choice",
        required: [true],
        preamble: ['Click on the word that comes closest in meaning to the word in all CAPS:'],
        questions: [stims[i]],
        options: [choices[i]],
        correct: [correct[i]],
        force_correct: false,
      };
      arr.push(questions);
    }
    return arr;
  }

  componentDidMount() {
    /* access to class in inline functions */
    const _this = this;

    /* jspsych timeline */

    const intro = {
      type: "text",
      text: `
          <p> Are you interested in how your experience affects your language? </p>
          <p> Please answer the following questions about yourself. </p>
          <p align="center"> Press any key to continue. </p>
          `
    };


    const demographics = {
      type: "dropdown",
      questions: [{
        text: 'Gender:',
        options: ['Male', 'Female'],
        allowMultipleSelections: false,
        required: true,
        placeholder: 'Select gender'

      }, {
        text: 'Age:',
        options: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'],
        allowMultipleSelections: false,
        required: true,
        placeholder: 'Select age'
      }, {
        text: 'Your native langauge(s) learned from birth (if not listed, choose \'other\'):',
        options: ["Abenaki", "Abkhaz", "Adyghe", "Afrikaans", "Ainu", "Aklanon", "Alabama", "Albanian", "Algerian", "American Sign Language", "Apache", "Arabic", "Aragonese", "Aramaic", "Armenian", "Avestan", "Ayapathu", "Aymara", "Azeri", "Balinese", "Bamwe", "Bantu", "Basa", "Basque", "Belarusian", "Bemba", "Bengali", "Berber", "Betawi", "Bicol", "Bisaya", "Bobangi", "Bosnian", "Brahui", "Breton", "Butuanon", "Bukusu", "Bulgarian", "Burmese", "Carib", "Catalan", "Catawba", "Cayuga", "Cebuano", "Chamorro", "Chechen", "Cherokee", "Chewa", "Cheyenne", "Chickasaw", "Chinese/Cantonese/Yue", "Chinese/Danzhou", "Chinese/Gan", "Chinese/Hakka", "Chinese/Hokkien", "Chinese/Mandarin", "Chinese/Min Bei", "Chinese/Min Dong", "Chinese/Min Zhong", "Chinese/Pu Xian", "Chinese/Qiong Wen", "Chinese/Shao Jiang", "Chinese/Shaozhou Tuhua", "Chinese/Taiwanese/Min Nan/Hokkien", "Chinese/Wu/Shanghainese", "Chinese/Xiang/Hunanese", "Chinese/Xianghua", "Chinese/Yue", "Chinook", "Ch'ol", "Chorti", "Cispa", "Coptic", "Cornish", "Corsican", "Cree", "Creole", "Croatian", "Czech", "Danish", "Delaware", "Demonh'ka", "Denya", "Duma", "Dutch", "Eggon", "Ejagham", "Ekegusii", "Emakua", "English", "Eskimo", "Esperanto", "Estonian", "Ewe", "Fang", "Faroese", "Farsi", "Finnish", "Flemish", "Frankish", "French", "Frisian", "Fulfulde", "Gaelic", "Galician", "Gaulish", "Gamilaraay", "Ganda", "Gbari", "Georgian", "German", "Gevove", "Gilbertese", "Ginyama", "Gothic", "Greek", "Guarani", "Gujarati", "Gullah", "Haida", "Hakka", "Hawaiian", "Hausa", "Hiligaynon", "Hebrew", "Hmong", "Hindi", "Hittite", "Holoholo", "Hungarian", "Icelandic", "Igbo", "Ilongo", "Indonesian", "Ingush", "Interlingua", "Inuktitut", "Inzebi", "Irish", "Ishkashmi", "Italian", "Jangshung", "Japanese", "Jita", "Kalanga", "Kannada", "Kapampangan", "Karelian", "Kamviri", "Karuk", "Kashubian", "Katcha", "Kazakh", "Kerewe", "Khakas", "Khmer", "Khowar", "Kiga", "Kinyarwanda", "Kituba", "Klallam", "Konkani", "Korean", "Koromfé", "Koyo", "Kurdish", "Kyrgyz", "Lao", "Lakhota", "Latgalian", "Latin", "Latvian", "Lingala", "Lithuanian", "Livonian", "Lojban", "Lozi", "Luxembourgish", "Luwian", "Lydian", "Macedonian", "Malagasy", "Malay", "Maliseet", "Malayalam", "Maltese", "Mambwe", "Manchu", "Mandinka", "Manx", "Maori", "Mapudungun", "Marathi", "Masaba", "Mayan", "Mayangna", "Mawu", "Miami", "Michif", "Miskitu", "Mixtec", "Mohawk", "Mongolian", "Mpongwe", "Nahuatl", "Nande", "Nanticoke", "Nauruan", "Navajo", "Ndebele", "Nepalese", "Newari", "Nhirrpi", "Norwegian", "Nyambo", "Nyamwezi", "Occitan", "Ojibwe", "Olkola", "Olutec", "Onondaga", "Oriya", "Oscan", "Oykangand", "Pahlavi", "Pakahn", "Pali", "Papiamento", "Pashto", "Pende", "Passamdy", "Phrygian", "Pirahã", "Polish", "Popoluca", "Portuguese", "Potawatomi", "Pulaar", "Punjabi", "Quechua", "Quenya", "Rapa Nui", "Rasta", "Rejang", "Romani", "Romanian", "Roviana", "Rotuman", "Russian", "Saanich", "Saami", "Samoan", "Sanskrit", "Sardinian", "Scots", "Serbian", "Seri", "Sherpa", "Shi", "Sina Bidoyoh", "Shona", "Shoshoni", "Sindarin", "Sinhalese", "Slovak", "Slovene", "Sogdian", "Somali", "Sorbian", "Spanish", "Sranan", "Sûdovian", "Sumerian", "Swabian", "Swahili", "Swedish", "Swiss German", "Tagalog", "Tamasheq", "Tahitian", "Taino", "Tajik", "Tamazight", "Tamil", "Tarahumara", "Tarok", "Tatar", "Telugu", "Tetan", "Thai", "Tibetan", "Tlingit", "Tocharian", "Tongan", "Turkish", "Turkmen", "Twi", "Ukrainian", "Ulwa", "Umbrian", "Üqoi", "Urdu", "Uyghur", "Uzbek", "Venda", "Veps", "Vietnamese", "Votic", "Wagiman", "Walloon", "Warlpiri", "Welsh", "Wolof", "Wyandot", "Xhosa", "Yaka", "Yao", "Yemba", "Yiddish", "Yoruba", "Zarma", "Zoque", "Zulu", "Other"],
        allowMultipleSelections: true,
        required: true,
        placeholder: 'Select language(s)'

      }, {
        text: 'Your primary language now (if not listed, choose \'other\'):',
        options: ["Abenaki", "Abkhaz", "Adyghe", "Afrikaans", "Ainu", "Aklanon", "Alabama", "Albanian", "Algerian", "American Sign Language", "Apache", "Arabic", "Aragonese", "Aramaic", "Armenian", "Avestan", "Ayapathu", "Aymara", "Azeri", "Balinese", "Bamwe", "Bantu", "Basa", "Basque", "Belarusian", "Bemba", "Bengali", "Berber", "Betawi", "Bicol", "Bisaya", "Bobangi", "Bosnian", "Brahui", "Breton", "Butuanon", "Bukusu", "Bulgarian", "Burmese", "Carib", "Catalan", "Catawba", "Cayuga", "Cebuano", "Chamorro", "Chechen", "Cherokee", "Chewa", "Cheyenne", "Chickasaw", "Chinese/Cantonese/Yue", "Chinese/Danzhou", "Chinese/Gan", "Chinese/Hakka", "Chinese/Hokkien", "Chinese/Mandarin", "Chinese/Min Bei", "Chinese/Min Dong", "Chinese/Min Zhong", "Chinese/Pu Xian", "Chinese/Qiong Wen", "Chinese/Shao Jiang", "Chinese/Shaozhou Tuhua", "Chinese/Taiwanese/Min Nan/Hokkien", "Chinese/Wu/Shanghainese", "Chinese/Xiang/Hunanese", "Chinese/Xianghua", "Chinese/Yue", "Chinook", "Ch'ol", "Chorti", "Cispa", "Coptic", "Cornish", "Corsican", "Cree", "Creole", "Croatian", "Czech", "Danish", "Delaware", "Demonh'ka", "Denya", "Duma", "Dutch", "Eggon", "Ejagham", "Ekegusii", "Emakua", "English", "Eskimo", "Esperanto", "Estonian", "Ewe", "Fang", "Faroese", "Farsi", "Finnish", "Flemish", "Frankish", "French", "Frisian", "Fulfulde", "Gaelic", "Galician", "Gaulish", "Gamilaraay", "Ganda", "Gbari", "Georgian", "German", "Gevove", "Gilbertese", "Ginyama", "Gothic", "Greek", "Guarani", "Gujarati", "Gullah", "Haida", "Hakka", "Hawaiian", "Hausa", "Hiligaynon", "Hebrew", "Hmong", "Hindi", "Hittite", "Holoholo", "Hungarian", "Icelandic", "Igbo", "Ilongo", "Indonesian", "Ingush", "Interlingua", "Inuktitut", "Inzebi", "Irish", "Ishkashmi", "Italian", "Jangshung", "Japanese", "Jita", "Kalanga", "Kannada", "Kapampangan", "Karelian", "Kamviri", "Karuk", "Kashubian", "Katcha", "Kazakh", "Kerewe", "Khakas", "Khmer", "Khowar", "Kiga", "Kinyarwanda", "Kituba", "Klallam", "Konkani", "Korean", "Koromfé", "Koyo", "Kurdish", "Kyrgyz", "Lao", "Lakhota", "Latgalian", "Latin", "Latvian", "Lingala", "Lithuanian", "Livonian", "Lojban", "Lozi", "Luxembourgish", "Luwian", "Lydian", "Macedonian", "Malagasy", "Malay", "Maliseet", "Malayalam", "Maltese", "Mambwe", "Manchu", "Mandinka", "Manx", "Maori", "Mapudungun", "Marathi", "Masaba", "Mayan", "Mayangna", "Mawu", "Miami", "Michif", "Miskitu", "Mixtec", "Mohawk", "Mongolian", "Mpongwe", "Nahuatl", "Nande", "Nanticoke", "Nauruan", "Navajo", "Ndebele", "Nepalese", "Newari", "Nhirrpi", "Norwegian", "Nyambo", "Nyamwezi", "Occitan", "Ojibwe", "Olkola", "Olutec", "Onondaga", "Oriya", "Oscan", "Oykangand", "Pahlavi", "Pakahn", "Pali", "Papiamento", "Pashto", "Pende", "Passamdy", "Phrygian", "Pirahã", "Polish", "Popoluca", "Portuguese", "Potawatomi", "Pulaar", "Punjabi", "Quechua", "Quenya", "Rapa Nui", "Rasta", "Rejang", "Romani", "Romanian", "Roviana", "Rotuman", "Russian", "Saanich", "Saami", "Samoan", "Sanskrit", "Sardinian", "Scots", "Serbian", "Seri", "Sherpa", "Shi", "Sina Bidoyoh", "Shona", "Shoshoni", "Sindarin", "Sinhalese", "Slovak", "Slovene", "Sogdian", "Somali", "Sorbian", "Spanish", "Sranan", "Sûdovian", "Sumerian", "Swabian", "Swahili", "Swedish", "Swiss German", "Tagalog", "Tamasheq", "Tahitian", "Taino", "Tajik", "Tamazight", "Tamil", "Tarahumara", "Tarok", "Tatar", "Telugu", "Tetan", "Thai", "Tibetan", "Tlingit", "Tocharian", "Tongan", "Turkish", "Turkmen", "Twi", "Ukrainian", "Ulwa", "Umbrian", "Üqoi", "Urdu", "Uyghur", "Uzbek", "Venda", "Veps", "Vietnamese", "Votic", "Wagiman", "Walloon", "Warlpiri", "Welsh", "Wolof", "Wyandot", "Xhosa", "Yaka", "Yao", "Yemba", "Yiddish", "Yoruba", "Zarma", "Zoque", "Zulu", "Other"],
        allowMultipleSelections: true,
        required: true,
        placeholder: 'Select language(s)'

      }, {
        text: 'Country where you live now:',
        options: ["Afghanistan", "Albania", "Algeria", "Andorra", "Andorra", "Angola", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba (Netherlands)", "Austria", "Australia", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bonaire (Netherlands)", "Bosnia & Herzegovina", "Botswana", "Brazil", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burma (Myanmar)", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Cook Islands", "Congo, Democratic Republic", "Costa Rica", "Côte d'Ivoire", "Croatia", "Cuba", "Curacao (Netherlands)", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "East Timor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia, The", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong (China)", "Macau (China)", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland (Republic of)", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea-South", "Korea-North", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Netherlands", "North Korean", "Norway", "Oman", "Pakistan", "Palau", "Palestinian State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "St. Kitts & Nevis", "St. Lucia", "St. Vincent & The Grenadines", "Samoa", "San Marino", "São Tomé & Príncipe", "Saudi Arabia", "Senegal", "Serbia", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City (Holy See)", "Venezuela", "Vietnam", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"],
        allowMultipleSelections: true,
        required: true,
        placeholder: 'Select country'

      }]
    };

    const beginning_the_quiz = {
      type: "text",
      text: `
              <p> Beginning the quiz...</p>
              <p align="center"> Press any key to continue. </p>
              `

    };


    const comments = {
      type: "survey-text",
      questions: ['Any comments about the quiz?'],
      rows: [5],
      columns: [50]
    };


    const participant_score = {
      type: "visualize-results",
      participant_score: function() {
        return count_correct_trials
      },
      possible_score: 32

    };

    const thank_you = {
      type: "text",
      text: `
             <p> Thank you for your participation! </p>
             
             `
    };

    const timeline = [];
    const dataArray = [];
    let count_correct_trials = 0;
    let stims;
    let choices;
    let correct;
    let user;

    axiosShortQuiz
      .post('/getAllStimuli', /*{ user: { id: this.props.user.id } } */ )
      .then(function(res) {

        _this.hideLoading();
        stims = res.data.stimuli;
        choices = res.data.choices;
        correct = res.data.correct;
        user = res.data.user;
      })
      .then(() => {
        timeline.push(intro);
        timeline.push(demographics);
        timeline.push(beginning_the_quiz);
      })
      .then(() => {
        const actualTrials = this.getTrials(stims, choices, correct);
        for (let i in actualTrials) {
          timeline.push(actualTrials[i]);
        }

      })
      .then(() => {
        timeline.push(comments);
        timeline.push(participant_score);
        timeline.push(thank_you);
      })
      .then(() => {
        jsPsych.init({
          display_element: this.refs.jsPsychTarget,
          timeline: timeline,
          on_data_update: function(data) {
            console.log(data);
            dataArray.push(data);
            if (data.correct_score == 1) {
              count_correct_trials = count_correct_trials + data.correct_score;
            }
         

            if (data['trial_index']==1){
              console.log('found demographics');
              var toSend=data;
              toSend['description']='demographics';
              console.log(toSend);

              axiosShortQuiz
              .post('/response', {
               user_id:user,
               data_string:toSend
              })
              .then(function(res){})
              .catch(function(err){});

            }

            if (data['trial_type']=="survey-multi-choice") {
              console.log('found stim q');
              var current_stim = data['responses'].split('"')[3];
              console.log(current_stim);
              var toSend = data;
              toSend['description'] = `responses for stimulus ${current_stim}`;
              console.log(toSend);

              axiosShortQuiz
              .post('/stimulusResponse', {
                user_id:user,
                stimulus: current_stim,
                data_string: toSend
              })
              .then(function(res){})
              .catch(function(err){});
            }

            if (data['trial_type']=="survey-text") {
              console.log('found comments');
              var toSend = data;
              toSend['description'] = 'comments about the quiz';
              console.log(toSend);

              axiosShortQuiz
              .post('/response',{
                 user_id:user,
                 data_string: toSend
              })
              .then(function(res){})
              .catch(function(err){});

            }

            if (data['trial_type']=="visualize-results") {
              console.log('found score for participant!Yay');
              var toSend=data;
              toSend['description'] = 'score for this user';
              toSend['score'] = count_correct_trials;
              console.log(toSend);

              axiosShortQuiz
              .post('/response',{
                 user_id:user,
                 data_string: toSend
              })
              .then(function(res){})
              .catch(function(err){});
            }
            
          }
        });
      })
      .catch(function(err) {});
  }

/* This is part of the standard stuff too. */

  render() {
    const loading = this.state.loading;
    if (!this.props.children) {
      return (
        <div>
          <div id="jsPsychContainer">
            <ReactResizeDetector
              handleWidth
              handleHeight
              onResize={this.onResize}
            />

            <link
              rel="stylesheet"
              type="text/css"
              href={`${baseUrl}/css/jspsych.css`}
            />

            <div ref="preamble" id="preamble">
              <div style={{ display: loading ? '' : 'none' }}>
                <p className={s.loading}>
                  <b>Loading...</b>
                </p>
              </div>

              <div style={{ display: loading ? 'none' : '' }}>
                <p className={s.title}>The Short Quiz</p>
                <hr className={s.divider} />
              </div>
            </div>

            <div ref="jsPsychTarget" id="jsPsychTarget" />
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ShortQuiz;
/* eslint-disable max-len */
