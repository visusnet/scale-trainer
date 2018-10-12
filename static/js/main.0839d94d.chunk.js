(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{18:function(e,t,n){e.exports=n(38)},23:function(e,t,n){},25:function(e,t,n){},27:function(e,t,n){},36:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a,c,i,r,o,s,l,u=n(0),d=n.n(u),h=n(13),m=n.n(h),f=(n(23),n(3)),p=n(4),v=n(8),b=n(7),y=n(9),_=(n(25),n(1)),g=n(2),O=n(6),k=["A","B","C","D","E","F","G"],N="\u266f",j="\u266e",E="\u266d",A=[N,j,E],C=function(){function e(t,n){Object(f.a)(this,e),this.pitch=t,this.accidental=n}return Object(p.a)(e,[{key:"equals",value:function(e){var t=this.normalizeAccidentals(),n=e.normalizeAccidentals();return t.hasEqualPitch(n)&&t.hasEqualAccidental(n)}},{key:"hasEqualPitch",value:function(e){return this.pitch===e.pitch}},{key:"hasEqualAccidental",value:function(e){return this.accidental===e.accidental}},{key:"getRaisedNote",value:function(){return w(this.pitch,function(e){var t=(A.indexOf(e)+A.length-1)%A.length;return A[t]}(this.accidental))}},{key:"getLoweredNote",value:function(){return w(this.pitch,function(e){var t=(A.indexOf(e)+1)%A.length;return A[t]}(this.accidental))}},{key:"normalizeAccidentals",value:function(){if((arguments.length>0&&void 0!==arguments[0]?arguments[0]:N)===E){if(this.accidental===N)return w(M(this.pitch),"B"===this.pitch||"E"===this.pitch?j:E);if(this.accidental===E&&("C"===this.pitch||"F"===this.pitch))return w(S(this.pitch),j)}else{if(this.accidental===E)return w(S(this.pitch),"C"===this.pitch||"F"===this.pitch?j:N);if(this.accidental===N&&("B"===this.pitch||"E"===this.pitch))return w(M(this.pitch),j)}return this}},{key:"toString",value:function(){return e.noteToString(this)}},{key:"clone",value:function(){return w(this.pitch,this.accidental)}}],[{key:"accidentalToString",value:function(e){return e===j?"":e}},{key:"noteToString",value:function(t){return t.pitch+e.accidentalToString(t.accidental)}},{key:"areNoteArraysEqual",value:function(e,t){return e.length===t.length&&!e.map(function(e,n){var a=t[n];return e.equals(a)}).some(function(e){return!e})}}]),e}();function w(e,t){return new C(e,t||j)}function S(e){var t=(k.indexOf(e)+k.length-1)%k.length;return k[t]}function M(e){var t=(k.indexOf(e)+1)%k.length;return k[t]}var H=["P1","m2","M2","m3","M3","P4","P5","m6","M6","m7","M7","P8"],x=["d2","A1","d3","A2","d4","A3","d5","A4","d6","A5","d7","A6","d8","A7"],W={P1:0,d2:0,m2:1,A1:1,semitone:1,"half tone":1,"half step":1,H:1,M2:2,d3:2,tone:2,"whole tone":2,"whole step":2,W:2,m3:3,A2:3,M3:4,d4:4,P4:5,A3:5,d5:6,A4:6,tritone:6,P5:7,d6:7,m6:8,A5:8,M6:9,d7:9,m7:10,A6:10,M7:11,d8:11,P8:12,A7:12},I={A:(a={},Object(_.a)(a,E,w("A")),Object(_.a)(a,j,w("A",N)),Object(_.a)(a,N,w("B")),a),B:(c={},Object(_.a)(c,E,w("B")),Object(_.a)(c,j,w("C")),Object(_.a)(c,N,w("C",N)),c),C:(i={},Object(_.a)(i,E,w("C")),Object(_.a)(i,j,w("C",N)),Object(_.a)(i,N,w("D")),i),D:(r={},Object(_.a)(r,E,w("D")),Object(_.a)(r,j,w("D",N)),Object(_.a)(r,N,w("E")),r),E:(o={},Object(_.a)(o,E,w("E")),Object(_.a)(o,j,w("F")),Object(_.a)(o,N,w("F",N)),o),F:(s={},Object(_.a)(s,E,w("F")),Object(_.a)(s,j,w("F",N)),Object(_.a)(s,N,w("G")),s),G:(l={},Object(_.a)(l,E,w("G")),Object(_.a)(l,j,w("G",N)),Object(_.a)(l,N,w("A")),l)};function T(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:H,a=-1;return t.reduce(function(e,t){return a+=W[t],Object(O.a)(e).concat([n[a]])},[])}var Q=["ionian","dorian","phrygian","lydian","mixolydian","aeolian","locrian"],q=[],B=function(){function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:q;Object(f.a)(this,e),this.name=t,this.construction=n,this.modes=a}return Object(p.a)(e,[{key:"toString",value:function(){return this.name}}]),e}(),F=["W","W","H","W","W","W","H"],D=["W","H","W","W","H","W","W"],P=["W","H","W","W","W","W","H"],G=["H","H","H","H","H","H","H","H","H","H","H","H"],R=["A2","H","A2","H","A2","H"],L=["W","H","H","A2","W","A2"],z=["A2","W","H","H","A2","H"],J=["W","W","A2","W","A2"],U=["A2","W","W","A2","W"],K=new B("harmonic minor",["W","H","W","W","H","A2","H"],["harmonic minor","locrian \u266f6","ionian \u266f5","dorian \u266f4","phrygian dominant","lydian \u266f2","ultralocrian"]),V=new B("melodic minor",P,["melodic minor","dorian \u266d2","lydian \u266f5","lydian \u266d7","mixolydian \u266d6","locrian \u266f2","superlocrian"]),Y=new B("major",F,Q),$=new B("minor",D,Q),X=new B("chromatic",G),Z=new B("augmented",R),ee=new B("major blues",L),te=new B("minor blues",z),ne=new B("major pentatonic",J),ae=new B("minor pentatonic",U),ce=[Y,$,K,V,X,Z,ee,te,ne,ae];function ie(e){return ce.find(function(t){return t.name===e})}var re=function(){function e(t,n,a){Object(f.a)(this,e),this.root=t,this.scale=n,this.mode=a}return Object(p.a)(e,[{key:"toNotes",value:function(){var e=this;return Object(O.a)(this.modeConstruction.slice(0,-1).reduce(function(t,n){var a=function(e,t){for(var n="number"===typeof t?t:W[t],a=e,c=0;c<n;c++)a=I[a.pitch][a.accidental];return a}(t[t.length-1],n);return Object(O.a)(t).concat([a.normalizeAccidentals(e.root.accidental)])},[this.root])).concat([this.root])}},{key:"toString",value:function(){var e=this.description;return"".concat(e.rootNote," ").concat(e.scaleName," ").concat(e.modeName," (").concat(e.alternativeModeName,")").trim()}},{key:"description",get:function(){if(0===this.scale.modes.length)return{};var e=this.scale.modes.indexOf(this.mode),t={rootNote:String(this.root),scaleName:String(this.scale)};return 0===e?t:Object(g.a)({},t,{modeName:String(this.mode),alternativeModeName:"mode ".concat(e+1," of ").concat(this.scale.name)})}},{key:"modeConstruction",get:function(){return this.mode?function(e,t){var n=e.length;return e.map(function(a,c){return e[((t+c)%n+n)%n]})}(this.scale.construction,this.scale.modes.indexOf(this.mode)):this.scale.construction}}]),e}();n(27);function oe(e){var t=e.accidental,n=e.accidentalIndex,a=e.isCurrentAccidental,c=e.isRoot,i=e.noteIndex,r=e.onChange,o="note-".concat(i,"-accidental-").concat(n);return d.a.createElement("div",{className:"scaleQuestion__accidental"},d.a.createElement("label",{htmlFor:o},d.a.createElement("input",{type:"radio",id:o,name:o,value:t,checked:a,onChange:function(e,t,n){return function(){n(e,t)}}(i,t,r),disabled:c}),d.a.createElement("span",{className:"scaleQuestion__accidentalValue"},t)))}var se=37,le=38,ue=39,de=40;function he(e){var t=e.isRoot,n=e.isSelected,a=e.noteIndex,c=e.onChange,i=e.onSwitchNote,r=e.note,o="scaleQuestion__note".concat(e.showError?" scaleQuestion__note--error":"");return d.a.createElement("div",{className:o,key:"note-".concat(a).concat(n?"-selected":"")},d.a.createElement("div",{className:"scaleQuestion__pitch"},d.a.createElement("input",{type:"text",name:"note-".concat(a,"-pitch"),value:r.pitch||"",disabled:t,tabIndex:a,autoFocus:n,onFocus:function(e){return function(e){if(console.log(e.selectionStart),"number"==typeof e.selectionStart)e.selectionStart=e.selectionEnd=e.value.length+1;else if("undefined"!==typeof e.createTextRange){e.focus();var t=e.createTextRange();t.collapse(!1),t.select()}}(e.target)},onChange:function(e,t,n){return function(a){a.preventDefault();var c=a.target.value.toUpperCase().substr(-1),i=w(me(c),t);n(e,i)}}(a,r.accidental,c),onKeyDown:function(e,t,n,a){return function(c){var i=c.keyCode===de,r=c.keyCode===le,o=c.keyCode===se,s=c.keyCode===ue;if(i||r){c.preventDefault();var l=t?i?t.getLoweredNote():t.getRaisedNote():w(t.pitch,i?E:N);n(e,l)}else if(o||s){var u=s?1:-1;a(e+u)}else c.target.value=me(c.key.toUpperCase())}}(a,r,c,i),maxLength:2})),d.a.createElement("div",{className:"scaleQuestion__accidentals"},A.map(function(e,n){return d.a.createElement(oe,{key:"note-".concat(a,"-accidental-").concat(n),accidental:e,accidentalIndex:n,isCurrentAccidental:r.accidental===e,isRoot:t,noteIndex:a,onChange:function(e,t,n,a){return function(){var c=w(t,n);a(e,c)}}(a,r.pitch,e,c)})})))}function me(e){var t=e.toUpperCase();return k.includes(t)?t:""}var fe=n(14),pe=n.n(fe),ve=w(void 0,j),be=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,c=new Array(a),i=0;i<a;i++)c[i]=arguments[i];return(n=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(c)))).state={notes:{},correctNotes:{},isAnswered:!1,isCorrect:!1,showErrors:!1,showHint:!1,selectedNoteIndex:1},n._handleAnswer=function(e){e.preventDefault(),n._canBeAnswered&&n.setState(function(e,t){var n=t.question.key.toNotes(),a=n[0],c=Object.keys(e.notes).map(function(t){return e.notes[t]}),i=[a].concat(Object(O.a)(c),[a]);return Object(g.a)({},e,{isAnswered:!0,showErrors:!0,showHint:!1,isCorrect:C.areNoteArraysEqual(n,i)})})},n._handleHintClick=function(e){e.preventDefault(),n.setState(function(e){return Object(g.a)({},e,{showHint:!0,isCorrect:!1,hintIndex:function e(t,n){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:t-1,c=Math.floor(Math.random()*(n-t+1))+t;return c===a?e(t,n,a):c}(0,2,e.hintIndex)})})},n._handleNextClick=function(e){e.preventDefault(),n.props.onNextClick()},n._handleNoteChange=function(e,t){var a=n.props.question.key.toNotes();n.setState(function(e,t,n){return function(a){return Object(g.a)({},a,{notes:Object(g.a)({},a.notes,Object(_.a)({},e,t)),correctNotes:Object(g.a)({},a.correctNotes,Object(_.a)({},e,n)),showErrors:!1})}}(e,t,a[e].equals(t)))},n._handleSwitchNote=function(e){var t,a,c,i=n.props.question.key.toNotes().length-1;n.setState((t=((e-(a=1))%((c=i)-a)+c-a)%(c-a)+a,function(e){return Object(g.a)({},e,{selectedNoteIndex:t})}))},n}return Object(y.a)(t,e),Object(p.a)(t,[{key:"_getNote",value:function(e,t){return ye(e,t)?e.root:this.state.notes[t]?this.state.notes[t]:ve}},{key:"renderScaleInputs",value:function(e){var t,n=this,a=e.scale.construction.length+1;return d.a.createElement("div",{className:"scaleQuestion__notes"},(t=a,Array.from(Array(t).keys())).map(function(t){var a=n._getNote(e,t),c=ye(e,t),i=!c&&n.state.showErrors&&!n.state.correctNotes[t],r=n.state.selectedNoteIndex===t;return d.a.createElement(he,{key:"note-".concat(t),isRoot:c,isSelected:r,noteIndex:t,onChange:n._handleNoteChange,onSwitchNote:n._handleSwitchNote,note:a,showError:i})}))}},{key:"renderFretboard",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return d.a.createElement("div",{className:"scaleQuestion__fretboard"},d.a.createElement(pe.a,{skinType:"strings",selectedNotes:this.props.question.key.toNotes().map(_e),showSelectionLabels:e}))}},{key:"renderHint",value:function(e){var t=e.modeConstruction,n=[T(e.root,t).join(" "),T(e.root,t,x).join(" "),t.join("-")];return d.a.createElement("div",{className:"scaleQuestion__hint"},d.a.createElement("h1",null,"Hint"),d.a.createElement("p",null,n[this.state.hintIndex]),this.renderFretboard(!1))}},{key:"renderSolution",value:function(e){var t=e.toNotes(),n=this.state.isCorrect?"correct":"wrong",a="scaleQuestion__solution scaleQuestion__solution--".concat(n);return d.a.createElement("div",{className:a},d.a.createElement("h1",null,this.state.isCorrect?"Awesome!":"Wrong"),d.a.createElement("p",null,this.state.isCorrect?"Your solution is correct!":"Sorry, but this is correct: ".concat(t.map(C.noteToString).join(" "))),this.renderFretboard())}},{key:"renderActions",value:function(){var e=!this._canBeAnswered&&!this.state.isAnswered,t=this.state.isAnswered;return d.a.createElement("div",{className:"scaleQuestion__actions"},d.a.createElement("button",{onClick:this._handleAnswer,disabled:e},"Answer"),d.a.createElement("button",{onClick:this._handleHintClick,disabled:t},"Hint"),d.a.createElement("button",{onClick:this._handleNextClick},"Next"))}},{key:"render",value:function(){var e=this.props.question.key,t=e.description,n=t.modeName?" ".concat(t.modeName):"",a="".concat(t.rootNote," ").concat(t.scaleName).concat(n),c=t.alternativeModeName?t.alternativeModeName:"\xa0";return d.a.createElement("div",{className:"scaleQuestion"},d.a.createElement("div",{className:"scaleQuestion__question"},d.a.createElement("p",null,"Complete this scale:"),d.a.createElement("h1",{className:"scaleQuestion__scaleName"},a),d.a.createElement("h2",{className:"scaleQuestion__alternativeModeName"},c)),d.a.createElement("div",{className:"scaleQuestion__answer"},this.renderScaleInputs(e),this.renderActions()),this.state.showHint&&this.renderHint(e),this.state.isAnswered&&this.renderSolution(e))}},{key:"_canBeAnswered",get:function(){var e=this,t=Object.keys(this.state.notes),n=t.length,a=this.props.question.key.scale.construction.length-1,c=t.some(function(t){var n=e.state.notes[t];return n.pitch&&k.includes(n.pitch)&&n.accidental&&A.includes(n.accidental)});return n===a&&c}}]),t}(u.Component);function ye(e,t){return 0===t||t===e.scale.construction.length}function _e(e){var t=e.accidental===j?"":e.accidental===E?"b":"#";return e.pitch+t}var ge=[w("B",N),w("C",E),w("E",N),w("F",E)];function Oe(e,t,n){var a=function(e){return ke(function(e){return Object.keys(e).reduce(function(t,n){return e[n]?Object(O.a)(t).concat([n]):t},[])}(e).map(ie))}(n),c=a.modes.length>0?t?function(e){return ke(e.modes)}(a):a.modes[0]:void 0;return new re(function e(t){var n=w(ke(k),t?ke(A):j);if(function(e){return!ge.map(function(t){return t.equals(e)}).some(function(e){return!e})}(n))return e();return n}(e),a,c)}function ke(e){return e[Math.floor(Math.random()*e.length)]}n(36);var Ne=ce.reduce(function(e,t){return Object(g.a)({},e,Object(_.a)({},t.name,!0))},{}),je=function(e){function t(){var e,n;Object(f.a)(this,t);for(var a=arguments.length,c=new Array(a),i=0;i<a;i++)c[i]=arguments[i];return(n=Object(v.a)(this,(e=Object(b.a)(t)).call.apply(e,[this].concat(c)))).state={isMenuOpen:!1,question:void 0,options:{includeAccidentals:Ee("includeAccidentals"),includeModes:Ee("includeModes"),scales:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=localStorage.getItem(e);if(null===n||"undefined"===typeof n)return t;return Object(g.a)({},t,JSON.parse(n))}("scales",Ne)}},n._handleNextClick=function(){n._updateQuestion()},n._handleOptionChange=function(e){var t=e.target.value,a=!n.state.options[t];n.setState(function(e,t){return function(n){return localStorage.setItem(e,t),Object(g.a)({},n,{options:Object(g.a)({},n.options,Object(_.a)({},e,t))})}}(t,a),n._updateQuestion)},n._handleScaleOptionChange=function(e){var t=e.target.value,a=!n.state.options.scales[t];n.setState(function(e,t){return function(n){var a=Object(g.a)({},n.options.scales);a[e]=t;var c=!Object.keys(a).some(function(e){return a[e]});return c&&(a[Y.name]=!0),localStorage.setItem("scales",JSON.stringify(a)),Object(g.a)({},n,{options:Object(g.a)({},n.options,{scales:a})})}}(t,a),n._updateQuestion)},n._handleMenuButtonClick=function(){n.setState(function(e){return{isMenuOpen:!e.isMenuOpen}})},n._updateQuestion=function(){n.setState(function(e){return{question:(t=e.options.includeAccidentals,n=e.options.includeModes,a=e.options.scales,{type:"scale",key:Oe(t,n,a)})};var t,n,a})},n}return Object(y.a)(t,e),Object(p.a)(t,[{key:"componentWillMount",value:function(){this._updateQuestion()}},{key:"renderOptions",value:function(){var e=this,t=this._onlyMajorScaleSelected;return d.a.createElement("div",{className:"scaleTrainer__options"},d.a.createElement("details",{className:"scaleTrainer__accidentals"},d.a.createElement("summary",null,"Notes"),d.a.createElement("div",{className:"scaleTrainer__menuItemGroup"},d.a.createElement("label",{htmlFor:"includeAccidentals",className:"scaleTrainer__menuItem"},d.a.createElement("input",{type:"checkbox",id:"includeAccidentals",name:"includeAccidentals",value:"includeAccidentals",checked:this.state.options.includeAccidentals,onChange:this._handleOptionChange}),"Accidentals"))),d.a.createElement("details",{className:"scaleTrainer__scales"},d.a.createElement("summary",null,"Scales"),d.a.createElement("div",{className:"scaleTrainer__menuItemGroup"},ce.map(function(n){return d.a.createElement("label",{htmlFor:n.name,key:n.name,className:"scaleTrainer__menuItem"},d.a.createElement("input",{type:"checkbox",id:n.name,name:n.name,value:n.name,checked:e.state.options.scales[n.name],disabled:t&&n.name===Y.name,onChange:e._handleScaleOptionChange}),n.name)}))),d.a.createElement("details",{className:"scaleTrainer__modes"},d.a.createElement("summary",null,"Modes"),d.a.createElement("div",{className:"scaleTrainer__menuItemGroup"},d.a.createElement("label",{htmlFor:"includeModes",className:"scaleTrainer__menuItem"},d.a.createElement("input",{type:"checkbox",id:"includeModes",name:"includeModes",value:"includeModes",checked:this.state.options.includeModes,onChange:this._handleOptionChange}),"Modes"))))}},{key:"renderMenuBar",value:function(){return d.a.createElement("div",{className:"scaleTrainer__menuBar"},d.a.createElement("button",{className:"scaleTrainer__openMenuButton",onClick:this._handleMenuButtonClick}))}},{key:"renderMenu",value:function(){var e="scaleTrainer__menu".concat(this.state.isMenuOpen?" scaleTrainer__menu--open":"");return d.a.createElement("div",{className:e},d.a.createElement("button",{className:"scaleTrainer__closeMenuButton",onClick:this._handleMenuButtonClick}),this.renderOptions())}},{key:"render",value:function(){var e=this.state.question;return d.a.createElement("div",{className:"scaleTrainer"},this.renderMenuBar(),this.renderMenu(),e&&"scale"===e.type?d.a.createElement(be,{key:function(e){return"".concat(e.type).concat(e.key)}(e),question:e,onNextClick:this._handleNextClick}):d.a.createElement("div",null,"Loading..."))}},{key:"_onlyMajorScaleSelected",get:function(){var e=this.state.options.scales;return 1===Object.keys(e).reduce(function(t,n){return e[n]?t+1:t},0)&&e[Y.name]}}]),t}(u.Component);function Ee(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=localStorage.getItem(e);return null===n||"undefined"===typeof n?t:"true"===n}var Ae=function(e){function t(){return Object(f.a)(this,t),Object(v.a)(this,Object(b.a)(t).apply(this,arguments))}return Object(y.a)(t,e),Object(p.a)(t,[{key:"render",value:function(){return d.a.createElement(d.a.Fragment,null,d.a.createElement(je,null),d.a.createElement("div",{className:"breakpoint--mobile"},"Mobile"),d.a.createElement("div",{className:"breakpoint--tablet"},"Tablet"),d.a.createElement("div",{className:"breakpoint--desktop"},"Desktop"))}}]),t}(u.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));m.a.render(d.a.createElement(Ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[18,2,1]]]);
//# sourceMappingURL=main.0839d94d.chunk.js.map