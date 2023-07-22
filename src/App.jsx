import { useState, useRef } from 'react'
import ReactConfetti from 'react-confetti'
import { FaGithub } from 'react-icons/fa'
import { BsArrowCounterclockwise } from 'react-icons/bs'
import styles from './App.module.css'
import music from './music/lion.mp3'
import logo from './imgs/logo-leonardo.png'


function App() {

  const [minRange, setMinRange] = useState(1)
  const [maxRange, setMaxRange] = useState(10)
  const [numRandom, setNumRandom] = useState()
  const [scrolling, setScrolling] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const alertNum = useRef(null)
  const bgBlackWallpaper = useRef(null)
  const bgBlackH1 = useRef(null)
  const playMusic = useRef(null)
  const containerHomeRef = useRef(null)
  const numChoosed = useRef(null)
  const confetti = useRef(null)


  // Functions
  const bgBlackHidden = () => {
    bgBlackWallpaper.current.style.opacity = "0";
    bgBlackH1.current.style.transform = "scale(0)";
    playMusic.current.play();
    setTimeout(() => {
      bgBlackWallpaper.current.style.display = "none";
    }, 2000)
  }

  const generateNumber = () => {
    numChoosed.current.style.opacity = "0";
    if (minRange && maxRange) {
      if (minRange > maxRange) {
        alertNum.current.style.opacity = "1";
      } else {
        alertNum.current.style.opacity = "0";
        containerHomeRef.current.style.marginTop = "-100vh";
        setNumRandom(Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange);
        setScrolling(true);
      }
    } else {
      alertNum.current.style.opacity = "1";
    }
  }

  const showNumber = () => {
    setShowConfetti(true);
    numChoosed.current.style.opacity = "1";
  }

  const scrollToTop = () => {
    containerHomeRef.current.style.marginTop = "0";
    setTimeout(() => {
      setShowConfetti(false)
      setScrolling(false)
    }, 4500)
  }

  return (
    <>
      <div ref={containerHomeRef} className={styles.containerHome}>
        <div onClick={bgBlackHidden} className={styles.bgBlack} ref={bgBlackWallpaper}>
          <h1 ref={bgBlackH1}><span>CLIQUE</span><span>PARA</span><span>INICIAR...</span></h1>
        </div>
        <div className={styles.logo}>
          <img src={logo} alt="Logo Leonardo" />
        </div>
        <div>
          <audio ref={playMusic} src={music} loop />
        </div>
        <div className={styles.signature}>
          <p className={styles.paragraph}><span>Coded by </span><a href="https://github.com/thiag1114" target="_blank">Thiago Augusto <FaGithub /></a></p>
        </div>
        <div className={styles.drawerContainer}>
          <p className={styles.subTitle}><span>ESCOLHA</span><span>O</span><span>INTERVALO</span></p>
          <div className={styles.labelContainer}>
            <label>
              <span>MIN:</span><input type="number" name="minRange" id="minRange" value={minRange || ""} onChange={(e) => setMinRange(+e.target.value)} />
            </label>
            <label>
              <span>MAX:</span><input type="number" name="maxRange" id="maxRange" value={maxRange || ""} onChange={(e) => setMaxRange(+e.target.value)} />
            </label>
          </div>
          <p ref={alertNum} className={styles.alertMessage}><span>Preencha o intervalo.</span><span>O valor mínimo não pode ser maior que o máximo.</span></p>
          <input className={scrolling ? `${styles.disabledBtn} ${styles.btnGenerate}` : `${styles.btnGenerate}`} onClick={generateNumber} type="button" value="SORTEARµAGORA" />
        </div>
      </div>

      <div className={styles.containerWinner}>
        <div className={styles.title}>
          <span>NÚMERO</span><span>SORTEADO.</span><span>CLIQUE</span><span>PARA</span><span>MOSTRAR...</span>
        </div>
        <div>
          {showConfetti && <ReactConfetti className={styles.confetti} ref={confetti} />}
          <p ref={numChoosed} onClick={showNumber}>{numRandom}</p>
        </div>
        <button className={styles.btnTop} onClick={scrollToTop}>
          <BsArrowCounterclockwise className={styles.restartIcon} />
        </button>
      </div>
    </>
  )
}

export default App
