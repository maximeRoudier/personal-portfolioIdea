/* -- * Variables * -- */
var progressBar = $('.loader__bar-full');
var progressNumber = $('.loader__number span');
var progress = 0;
var remplissageTmp = setInterval(remplissage, 15);
var numberLeft = $('.nav__cover-left .nav__number-left');
var numberRight = $('.nav__cover-right .nav__number-right');







/* -- * Listeners * -- */

// verifBordureProjet
$(document).ready(function(){
  verifBordureProjet();
});

// Hover title projects
if (window.matchMedia("(min-width: 600px)").matches) {
  $('.project__name p').mouseover(function(){
    $('.project__image').css('transform', 'translateY(-40vh)');
    $('.project__subject').css('opacity', '1');
  });

  $('.project__name p').mouseleave(function() {
    $('.project__image').css('transform', 'translateY(0vh)');
    $('.project__subject').css('opacity', '0');
  });
}

// changement de projet
$('.project__nav-cover').click(function(){
  var direction = $(this).attr('id');
  var lastProjectViewed = $('.portfolio__project__content article.active').attr('id').substring(7, 8);
  var avancer = parseInt(lastProjectViewed)*100;

  $('#project'+lastProjectViewed+'').removeClass('active');

  if(direction == 'right'){
    var numProjetDeDroite = parseInt(lastProjectViewed)+1;
    $('.portfolio__project__content .project__content-'+numProjetDeDroite+'').addClass('active');
    $('.project__content-'+numProjetDeDroite+' .project__image').css('height', '50vh');
    $('.project__content-'+lastProjectViewed+' .project__image').css('height', '0vh');
    numberRight.text('0'+(numProjetDeDroite+1)+'');
    numberLeft.text('0'+(numProjetDeDroite-1)+'');
    $('.portfolio__project__content').css('transform', 'translateX(-'+avancer+'vw)');
    verifBordureProjet();
  }
  else{
    var numProjetDeGauche = parseInt(lastProjectViewed)-1;
    $('.portfolio__project__content .project__content-'+numProjetDeGauche+'').addClass('active');
    var reculer = avancer-200;
    $('.project__content-'+numProjetDeGauche+' .project__image').css('height', '50vh');
    $('.project__content-'+lastProjectViewed+' .project__image').css('height', '0vh');
    numberRight.text('0'+(numProjetDeGauche+1)+'');
    numberLeft.text('0'+(numProjetDeGauche-1)+'');
    $('.portfolio__project__content').css('transform', 'translateX(-'+reculer+'vw)');
    verifBordureProjet();
  }
})

// Ouvrir un projet
$('.project__name p').click(function(){
  var thisProject = $('article.active .project__name').attr('id').substring(13, 14);
  var tl = new TimelineMax({delay:0.1});

  $('#project'+thisProject+ ' .project__image').addClass('open');
  $('#project'+thisProject+'').removeClass('presentation');
  tl.staggerTo($('.portfolio__link-list li a'), 0.8, {opacity:0}, 0.2)
    .to($('.project__nav-cover'), 0.1, {width:0})
    .to(numberRight, 0.1, {opacity:0})
    .to(numberLeft, 0.1, {opacity:0})
    .to($('article#project'+thisProject), 0.1, {className:"+=project__open"})
    .to($('html'), 0.1, {className:"+=scrollVertical"});
})

// Fermer un projet
$('.project__close-btn').click(function(){
  var thisProject = $('article.active .project__name').attr('id').substring(13, 14);
  // window.scrollTo(0, 0);
  $("html, body").animate({ scrollTop: 0 }, "slow");
  var tl = new TimelineMax({delay:0.1});

  $('#project'+thisProject+ ' .project__image').removeClass('open');
  $('#project'+thisProject+'').addClass('presentation');
  tl.to($('article#project'+thisProject), 0.1, {className:"-=project__open"})
    .to($('.project__nav-cover'), 0.3, {width:'15vw'})
    .to(numberRight, 0.1, {opacity:0.2})
    .to(numberLeft, 0.1, {opacity:0.2})
    .staggerTo($('.portfolio__link-list li a'), 1, {opacity:1}, 0.2)
    .to($('html'), 0.1, {className:"-=scrollVertical"});
});

// Click About Me / All project
$('.portfolio__head__project').click(function(){
  if($(this).hasClass('visible')){
    var menuLien = $(this);
    console.log('on va vers la partie project');
    afficherPartieProject(menuLien);
  }
  else{
    var menuLien = $(this);
    console.log('on va vers la partie about');
    afficherPartieAbout(menuLien);
  }
});








/* -- * Fonctions * -- */

// loader
function remplissage(){
  if(progress == 100){
    clearInterval(remplissageTmp);
    $('.loader').fadeOut("slow");
  }
  else {
    progress++;
    progressBar.css('width', ''+progress+'vw');
    progressNumber.html(progress);
  }
}

// Suppression des bordures limites
function verifBordureProjet(){
  var projectActive = $('.portfolio__project__content article.active').attr('id').substring(7, 8);
  var nbProject = $('article').length;
  if(projectActive == '1'){
    $('.nav__cover-left').css('display', 'none');
  }
  else if(projectActive == nbProject) {
    $('.nav__cover-right').css('display', 'none');
  }
  else{
    $('.project__nav-cover').css('display', 'flex');
  }
}

function afficherPartieProject(menuLien){
  // $(menuLien).removeClass('visible');
  // $('.portfolio__head__about').addClass('visible');
  var tl = new TimelineMax({delay:0.1});

  tl.to(menuLien, 0.5, {className:"-=visible"},0.5)
    .to($('.portfolio__about'),1, {opacity:0},0.5)
    .to($('.project__nav-cover'), 0.5, {width:'15vw'})
    .to(numberRight, 0.3, {opacity:0.2})
    .to(numberLeft, 0.3, {opacity:0.2})
    .to($('.portfolio__about'),0.1, {display:'none'})
    .to($('.project__content'),0.1, {display:'block'},0.5)
    .to($('.project__content'),1, {opacity:1})
    .to($('.portfolio__head__about'), 0.1, {className:"+=visible"});

}

function afficherPartieAbout(menuLien){
  // $('.portfolio__head__about').removeClass('visible');
  // $(menuLien).addClass('visible');
  var tl = new TimelineMax({delay:0.1});

  tl.to($('.portfolio__head__about'), 0.1, {className:"-=visible"},0.5)
    .to($('.project__content'),1, {opacity:0},0.5)
    .to($('.project__nav-cover'), 0.5, {width:0})
    .to($('.project__content'),0.1, {display:'none'})
    .to(numberRight, 0.3, {opacity:0})
    .to(numberLeft, 0.3, {opacity:0})
    .to($('.portfolio__about'), 0.1, {display:'block'},0.5)
    .to($('.portfolio__about'),1, {opacity:1})
    .to(menuLien, 0.1, {className:"+=visible"});

}
