import React, { useEffect, useState } from "react"
import { PropTypes } from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { motion, AnimatePresence } from "framer-motion"

const WelcomeAnimation = () => {
  const [dimensions, setDimensions] = useState({})

  const [isLogoVisible, setLogoVisible] = useState(false)
  const [isArtistTitleVisible, setArtistTitleVisible] = useState(false)
  const [isSubTitleVisible, setSubTitleVisible] = useState(false)

  useEffect(() => {
    function handleResize() {
      setDimensions({ height: window.innerHeight, width: window.innerWidth })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLogoVisible(true)
      setTimeout(() => {
        setLogoVisible(false)
        setTimeout(() => {
          setArtistTitleVisible(true)
          setTimeout(() => {
            setSubTitleVisible(true)
            setTimeout(() => {
              setArtistTitleVisible(false)
              setSubTitleVisible(false)
            }, 1500)
          }, 500)
        }, 500)
      }, 800)
    }, 100)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: dimensions.height,
        width: dimensions.width,
      }}
    >
      <Logo visible={isLogoVisible} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
        }}
      >
        <ArtistTitle visible={isArtistTitleVisible} text="PIYUSH" />
        <ArtistTitle visible={isArtistTitleVisible} text="JAIN" />
      </div>
      <SubTitle visible={isSubTitleVisible} text="PHOTOGRAPHY" />
    </div>
  )
}

const SubTitle = ({ visible, text }) => {
  const variants = {
    initial: {
      scale: 0,
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    exit: {
      scale: 0,
      transition: {
        duration: 1.5,
      },
    },
  }

  return (
    <AnimatePresence>
      {visible && (
        <div
          style={{
            flexDirection: "row",
            borderWidth: 1,
            display: "flex",
            position: "absolute",
          }}
        >
          <motion.div
            initial="initial"
            animate="visible"
            exit="exit"
            variants={variants}
            style={{
              margin: 0,
              fontSize: "1rem",
              color: "black",
              fontFamily: "Poppins",
              letterSpacing: 30,
            }}
          >
            {text}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const ArtistTitle = ({ visible, text }) => {
  const name = text.split("")

  const variants = {
    initial: {
      y: 100,
    },
    visible: custom => ({
      y: 0,
      transition: {
        delay: custom.index * 0.04,
        duration: 0.5,
      },
    }),
    exit: custom => ({
      y: -100,
      transition: {
        delay: (custom.size - custom.index) * 0.04,
        duration: 1.5,
      },
    }),
  }

  return (
    <AnimatePresence>
      {visible && (
        <div
          style={{
            overflow: "hidden",
            flexDirection: "row",
            borderWidth: 1,
            display: "flex",
          }}
        >
          {name.map((alphabet, i) => (
            <motion.div
              initial="initial"
              animate="visible"
              exit="exit"
              variants={variants}
              custom={{ index: i, size: name.length }}
              key={i}
              style={{
                margin: 0,
                fontSize: "4rem",
                color: "white",
                fontFamily: "Oswald",
              }}
            >
              {alphabet}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

const Logo = ({ visible }) => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-icon.png" }) {
        childImageSharp {
          fixed(width: 100, height: 100, grayscale: true) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Img fixed={data.placeholderImage.childImageSharp.fixed} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

Logo.defaultProps = { visible: true }

Logo.propTypes = {
  visible: PropTypes.bool,
}

export default WelcomeAnimation
