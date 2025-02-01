import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import bg from '../assets/bg.png'
import clock from '../assets/clock.mp3';
import watch from '../assets/watch.mp3';
export default function Home() {
    let [data, setData] = useState()
    let [num, setNum] = useState(0)
    let [score, setScore] = useState(0);
    useEffect(()=>{
       
        
        quiz()
        function getVoices(){
            let voices = speechSynthesis.getVoices();
            if(!voices.length){
                let utterance = new SpeechSynthesisUtterance(" ");
                speechSynthesis.speak(utterance);
                voices = speechSynthesis.getVoices();
            }
            return voices;
        }
        function speak(text, voice, rate, pitch, volume){
            let speakData = new SpeechSynthesisUtterance();
            speakData.volume = volume;
            speakData.rate = rate;
            speakData.pitch = pitch;
            speakData.voice = voice;
            speakData.text = text;
            speakData.lang = 'en';
            speechSynthesis.speak(speakData);
        }
      
            if('speechSynthesis' in window){
                let voices = getVoices();
                let rate = 0.8, pitch = 1, volume = 1;
                let text = "please click on start button to start a quiz";
                speak(text, voices[1],rate,pitch,volume);
            }
            else{
                console.log("error");
            
            }
   
       
      
    
    },[])
    let quiz = async() =>{
      let result = await axios.get('https://quizapp-dckg.onrender.com/quiz');
      setData(result.data.questions)
      console.log(data)
     
    }
    let counter = 120;
    let start = ()=>{
        let container = document.getElementById("container");
        let reasoning_modal = document.getElementById("reasoning-modal");
        let score = document.getElementById("score");
    
        let num = 0;
        let question = document.getElementById("Question");
        let options = document.getElementById("options");
        let next = document.getElementById("next");
        let previous = document.getElementById("previous");
      
        let audio = new Audio(watch);
        let alarm = new Audio(clock);
        let answer1 = document.getElementById("answer1");
        let alarm2 = document.getElementById("alarm");
        let type1 = document.getElementById("type1");
        let start = document.getElementById("started");
        let description1 = document.getElementById("description1");
        
        let score_no = 0;
        start.style.display = "none";
            
            reasoning_modal.style.display = "block"
           setTimeout(()=>{
            type1.style.display = "block";
           
            
            let count = setInterval(function(){
                
               
               
               
                    let minute = Math.floor(counter  / 60);
                    let second = counter % 60;
                  
                    
                let timer = document.getElementById("timer");
                timer.innerHTML = minute + ":" + second
                audio.play();
                if(counter == 0){
                  clearInterval(count);
                  audio.pause();
                  alarm.play();
                  alarm2.classList.add("alarm");
                  setTimeout(() =>{
                    alarm.pause();
                    alarm2.classList.remove("alarm");
        
                  },5000);
                  setTimeout(() =>{
                    document.getElementById('reasoning').style.display = "none";
                    document.querySelector('.card').style.display = "flex";

                  }, 6000)
                  
                }
                
                
                counter--
        
            },1000)
        
        },1000)   
            
        

    }
    let answer = (e, id) =>{
    
        if(e == true){
            setScore(score + 10);
            document.getElementById(id).style.backgroundColor = "green"
           
        }
        else{
             document.getElementById(id).style.backgroundColor = "red"

        }

    }
    let next = () =>{
        if(num != 9){
           
            setNum(num + 1);
            Array.from(document.getElementsByClassName('options')).forEach(Element =>{
             Element.style.backgroundColor = "brown";
            })

        }
        if(num == 9){
            document.getElementById('reasoning').style.display = "none";
             document.querySelector('.card').style.display = "flex";

        }
       
      
    }
    let previous = () =>{
        if(num != 0){
            setScore(score - 10)
            setNum(num - 1);
            Array.from(document.getElementsByClassName('options')).forEach(Element =>{
             Element.style.backgroundColor = "brown";
            })
     

        }
       
    }
    let Answer = () =>{
        
        document.getElementById('description1').innerText = data[num].detailed_solution;
        document.querySelector('.description').style.display = "block"
        setTimeout(() =>{
            document.getElementById('description1').innerText = "";
             document.querySelector('.description').style.display = "none"


        },10000)

    }
    
  return (
    <> 
    <div className='w-full  h-screen main-container'>

    <div className = "description modal w-full  top-3/4 hidden ">
    <div className='m-auto  h-fit p-3 bg-green-400 text-white font-bold text-center ' id = "description1">

    </div>

     </div>
      <button id = "started" className='absolute  bg-green-600 w-60 h-60 text-2xl top-1/4 left-1/3 rounded-lg text-white shadow-black-300 shadow-md max-sm:w-40 max-sm:h-40' onClick={start}>Start</button>
    
        <div class = " m-full h-full pt-16 hidden " id = "reasoning-modal" >
            
        <div class = " max-w-3xl rounded-2xl m-auto box-border h-fit pb-6 shadow-blue-200 shadow-lg"  id = "reasoning"  >
        <div id = "type1" className=''>
        <div class = "timer flex justify-end p-2 text-3xl " id = "alarm"  ><i class = "fa fa-clock-o" style={{color: "white"}}></i></div>
        <div id = "timer" className='flex justify-end p-2' style={{ color: 'white'}}></div>
        <div class = "container">
            <div id = "Question" className=' h-fit text-white flex  justify-center'  >
            {data?data[num].description:''}

            </div>
            <div id = "options" className=' '  >
            {data?data[num].options.map(Element =>(
                <button className='options' id = {Element.description}  onClick={() => answer(Element.is_correct, Element.description)}>{Element.description}</button>

            )):''
            }

            </div>
            <div class = "btn row  w-full flex mt-4">
                <div class = "btn btn-primary col-md mr-3 shadow-xl" id = "answer1" onClick={Answer}>Answer</div>
                <div class = " btn btn-secondary previous col-md mr-3 shadow-xl " id = "previous" onClick={previous}>
                    Previous
                </div>
                <div class = " btn btn-primary Next col-md shadow-xl" id = "next" onClick={next} >
                    Next
                </div>
                
            </div>
            
            

        </div>
       
        </div>
      
        
        </div>
        
        </div>
        <div className='card max-w-4xl m-auto modal justify-center items-center hidden'>
        <div className='text-2xl font-bold'>
            Your Score is: {score}
            <div className='mt-6 font-bold text-2xl  text-yellow-500'> {score < 50?'Try to Practice':'Good Job'}</div>
            <div className='flex mt-6'>
            <button className='border p-2 rounded-md ' onClick={() =>{window.location.reload()}}>Retry Quiz</button>

            </div>
        </div>
         

        </div>
    </div>
  
    </>
  )
}
