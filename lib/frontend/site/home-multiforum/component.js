import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import Jump from 'jump.js'
import userConnector from 'lib/frontend/site/connectors/user' 
import config from 'lib/config'
import Footer from 'lib/frontend/site/footer/component'
import forumStore from 'ext/lib/stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'
import Search from './search/component'
import Particles from 'react-particles-js';

class HomeMultiForum extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: [],
      backgroundPolygon: {
        'fps_limit': 60,
        "particles": {
    "number": {
      "value": 162,
      "density": {
        "enable": true,
        "value_area": 819.8939057285982
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#ffffff"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 8.19893905728598,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 154.50686558733372,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1.639787811457196,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "bubble"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 45.687514017759966,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
      }
    }
  }

  componentDidMount() {
    const {
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter)
      .then((forums) => {
        this.setState({
          forums,
          // las páginas son de a 3 (definido en ext/lib/api/filter.js), entonces si devuelve 3, tal vez hay más
          showMore: forums.length === 3
        })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    const { page } = this.state;

    forumStore
      .filterBy(name)
      .then((forums) => {
        this.setState({
          page,
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleMoreClick = () => {
    const {
      page,
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter, page + 1)
      .then((forums) => {
        this.setState({
          page: this.state.page + 1,
          forums: [...this.state.forums, ...forums],
          showMore: forums.length === 3
        });
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    Jump('#consultas')
    // const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    // window.scrollTo(0, consultasNode.offsetTop)
  }

  render() {
    if (this.props.user.state.pending) return null

    const {
      showMore,
      activeFilter,
      forums
    } = this.state

    return (
      <div className='ext-site-home-multiforum'>
        <div className="particles-container"> 
        <img src="/lib/frontend/site/home-multiforum/decisiones-colectivas-logo.svg" className="decisiones-colectivas-logo"/>
        <img src="/lib/frontend/site/home-multiforum/latinamerica-logo-fill.svg" className="latinamerica-logo"/>
        <Particles params={this.state.backgroundPolygon} className="particles-canvas-container"/> 
        </div>
        {/* <section
          className='cover jumbotron'
          style={{
            backgroundImage: `url('${config.backgroundHome}')`
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <img
                src={config.logoCentralHome}
                alt="Logo"
                width="270px"
              />
              <p className='lead highlight'>
                {config.bajadaPlataforma}
              </p>
              <button
                className='btn btn-primary'
                onClick={this.handleButtonClick}
              >
                Quiero participar
              </button>
            </div>
          </div>
        </section> */}
        <div className='lead-paragraph'>
          <p>
            Esta plataforma es un espacio para diálogo, toma de decisiones y colaboraciones entre miembrxs de la <span className="bold">Red de Innovación Política</span>
          </p>
          <p className="bold">
            Seguí estos pasos para participar y debatir de forma efectiva y colaborativa
          </p>
        </div>
        <div className='section-icons col-md-10 offset-md-1'>
          <div className='row'>
            <div className='section-icon col-md-4'>
              <img
                className='icon'
                src={config.iconoHomeInformate}
                alt='Informate'
              />
              <div className='text'>
                <h5>Informate</h5> sobre las consultas disponibles
              </div>
            </div>
            <div className='section-icon col-md-4'>
              <img
                className='icon'
                src={config.iconoHomeParticipa}
                alt='Aporta'
              />
              <div className='text'>
                <h5>Aporta</h5> en los ejes de las consultas
              </div>
            </div>
            <div className='section-icon col-md-4'>
              <img
                className='icon'
                src={config.iconoHomeComparti}
                alt='Decide'
              />
              <div className='text'>
                <h5>Decide</h5> tu opinión, voto o comentario
              </div>
            </div>
          </div>
        </div>

        <div className='lead-paragraph last col-md-4 offset-md-4 col-xs-12'>
          <i className='icon-arrow-down' onClick={this.handleButtonClick} />
        </div>

        <div className='container forums-list' id='consultas'>
          <h2 className='forums-list-title'>Conocé las consultas</h2>
          <div className="filter-container content-center">
            <div className="btn-group btn-group-sm dropdown-element" role="group" aria-label="Filtros">
              <button
                className={`btn dropbtn ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                {(() => {
                  switch (this.state.activeFilter) {
                    case 'byDate':
                      return 'Nuevas'
                    case 'byPopular':
                      return 'Relevantes'
                    case 'byClosed':
                      return 'Finalizadas'
                  }
                })()}
              </button>
              <ul className='dropdown-content'>
                <li
                  className={`btn btn-item-dropdown ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={this.handleClick.bind(this, 'byDate')}
                >
                  Nuevas
              </li>
                <li
                  className={`btn btn-item-dropdown ${activeFilter === 'byPopular' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={this.handleClick.bind(this, 'byPopular')}
                >
                  Relevantes
              </li>
                <li
                  className={`btn btn-item-dropdown ${activeFilter === 'byClosed' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={this.handleClick.bind(this, 'byClosed')}
                >
                  Finalizadas
              </li></ul>
            </div>
          </div>

          <Search />

          {!forums.length && <h3 className="no-result content-center">No hay resultados</h3>}

          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={forum.id} />
          ))}
          {!!forums.length && showMore &&
            <div className='row content-center'>
              <button className="btn btn-active show-more" onClick={this.handleMoreClick}>
                Cargar más consultas
              </button>
            </div>
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
