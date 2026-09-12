import { useState, useEffect } from 'react';
import { Badge, Button, Card, Col, Container, Modal, Nav, Row } from 'react-bootstrap';
import { FaGithub, FaImages, FaExternalLinkAlt } from 'react-icons/fa';
import './Projects.css';

const ProjectCard = ({ project, featured, onOpenGallery }) => {
  const hasScreenshots = project.screenshots?.length > 0;

  return (
    <Card className={`project-card-inner h-100 ${featured ? 'project-card-featured' : ''}`}>
      <div className="project-media-wrap">
        <Card.Img variant="top" src={project.imageSrc} className="project-image" alt={project.title} />
        <span className="project-category-badge">{project.category}</span>
        {featured && <span className="project-featured-badge">Featured</span>}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="project-title">{project.title}</Card.Title>
        <Card.Text className="project-description">{project.description}</Card.Text>

        {project.variants?.length > 0 ? (
          <div className="project-variants" aria-label={`${project.title} stack variants`}>
            {project.variants.map((variant) => (
              <div className="project-variant" key={variant.stack}>
                <Badge as="a" href={variant.link} target="_blank" rel="noreferrer" className="project-stack-badge">
                  {variant.stack} <FaExternalLinkAlt aria-hidden="true" />
                </Badge>
                {variant.github && (
                  <Button
                    as="a"
                    href={variant.github}
                    target="_blank"
                    rel="noreferrer"
                    variant="link"
                    className="project-github-icon"
                    aria-label={`${variant.stack} source code on GitHub`}
                  >
                    <FaGithub aria-hidden="true" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="project-technologies">
            {project.technologies?.map((technology) => (
              <Badge bg="secondary" key={technology}>{technology}</Badge>
            ))}
          </div>
        )}

        <div className="project-actions d-flex gap-2 mt-auto">
          {!project.variants && project.link && (
            <Button as="a" href={project.link} target="_blank" rel="noreferrer" className="project-btn project-btn-live">
              Live Preview
            </Button>
          )}
          {!project.variants && project.github && (
            <Button as="a" href={project.github} target="_blank" rel="noreferrer" className="project-btn project-btn-code">
              <FaGithub aria-hidden="true" /> GitHub
            </Button>
          )}
          {hasScreenshots && (
            <Button variant="outline-dark" className="project-btn" onClick={() => onOpenGallery(project)}>
              <FaImages aria-hidden="true" /> View Screenshots
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [galleryProject, setGalleryProject] = useState(null);
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/Amine-Triki/projects-data/main/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading projects:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  const openGallery = (project) => {
    setGalleryProject(project);
    setActiveScreenshot(0);
  };

  const categories = ['all', ...new Set(projects.map((project) => project.category))];
  const featuredProjects = projects.filter((project) => project.featured === true);
  const allProjects = projects.filter((project) => project.featured !== true);
  const filteredProjects = allProjects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory
  );


  if (loading) {
    return (
      <div className="projects-loading d-flex justify-content-center align-items-center" style={{ minHeight: '55vh' }}>
        <div className="spinner-border projects-spinner" role="status">
          <span className="visually-hidden">Loading projects...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <main className="projects-page d-flex align-items-center justify-content-center">
        <section className="projects-error text-center">
          <h2 className="mb-2">Unable to load projects</h2>
          <p className="mb-0">Please refresh the page and try again.</p>
        </section>
      </main>
    );
  }
  
  return (
    <main className="projects-page">
      <section className="projects-section text-center py-5">
        <Container>
          <div className="main-title mt-5 mb-4 position-relative projects-heading-wrap">
            <h2>My Projects</h2>
            <p>Things I design and build with modern web stacks</p>
          </div>

          <div className="projects-meta mb-4">
            <span className="projects-counter">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          {featuredProjects.length > 0 && (
            <section className="projects-group text-start mb-5" aria-labelledby="featured-projects-heading">
              <h3 id="featured-projects-heading" className="projects-group-title">Featured Projects</h3>
              <Row className="g-4">
                {featuredProjects.map((project) => (
                  <Col key={project.title} xs={12} md={6} lg={4}>
                    <ProjectCard project={project} featured onOpenGallery={openGallery} />
                  </Col>
                ))}
              </Row>
            </section>
          )}

          <section className="projects-group text-start" aria-labelledby="all-projects-heading">
            <h3 id="all-projects-heading" className="projects-group-title">Other Projects</h3>
            <Nav variant="pills" className="switcher mb-4" activeKey={activeCategory} onSelect={setActiveCategory}>
              {categories.map((category) => (
                <Nav.Item key={category}>
                  <Nav.Link eventKey={category}>{category === 'all' ? 'All' : category}</Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <div className="projects-meta mb-4">
              <span className="projects-counter">Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</span>
            </div>

            <Row className="g-4">
              {filteredProjects.map((project) => (
                <Col key={project.title} xs={12} sm={6} lg={4} xl={3}>
                  <ProjectCard project={project} onOpenGallery={openGallery} />
                </Col>
              ))}
              {!filteredProjects.length && (
                <Col>
                  <div className="projects-empty">
                    <h4 className="mb-2">No projects in this category yet</h4>
                    <p className="mb-0">Choose another filter to explore more work.</p>
                  </div>
                </Col>
              )}
            </Row>
          </section>
        </Container>
      </section>

      <Modal show={Boolean(galleryProject)} onHide={() => setGalleryProject(null)} centered size="lg" className="projects-gallery-modal">
        <Modal.Header closeButton>
          <Modal.Title>{galleryProject?.title} Screenshots</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {galleryProject && (
            <>
              <img
                src={galleryProject.screenshots[activeScreenshot]}
                alt={`${galleryProject.title} screenshot ${activeScreenshot + 1}`}
                className="gallery-main-image"
              />
              <div className="gallery-thumbnails" aria-label="Screenshot thumbnails">
                {galleryProject.screenshots.map((screenshot, index) => (
                  <button
                    type="button"
                    className={`gallery-thumbnail ${activeScreenshot === index ? 'active' : ''}`}
                    key={screenshot}
                    onClick={() => setActiveScreenshot(index)}
                  >
                    <img src={screenshot} alt={`${galleryProject.title} thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </main>
  );
};

export default Projects;