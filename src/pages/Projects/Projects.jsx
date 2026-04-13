import { useState, useEffect } from 'react';
import './Projects.css';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const switchCategories = (category) => {
    setActiveCategory(category);
  };

  const categories = [
    { key: 'all', label: 'All works' },
    { key: 'React', label: 'React' },
    { key: 'NextJs', label: 'NextJs' },
    { key: 'MERN', label: 'MERN' },
    { key: 'vue', label: 'Vue' },
    { key: 'Astro', label: 'Astro' },
    
  ];

  const filteredProjects = projects.filter(
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
        <div className="container">
          <div className="main-title mt-5 mb-4 position-relative projects-heading-wrap">
            <h2>My Projects</h2>
            <p>Things I design and build with modern web stacks</p>
          </div>

          <div className="projects-meta mb-4">
            <span className="projects-counter">
              Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
            </span>
          </div>

          <ul className="switcher d-flex justify-content-center px-2 flex-wrap mb-4">
            {categories.map(({ key, label }) => (
              <li
                key={key}
                className={activeCategory === key ? 'active' : ''}
                onClick={() => switchCategories(key)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    switchCategories(key);
                  }
                }}
              >
                {label}
              </li>
            ))}
          </ul>

          <div className="gallery text-start">
            <div className="projects-grid">
              {filteredProjects.map((project, index) => (
                <article className={`post ${project.category} project-card`} key={index}>
                  <div className="card h-100 project-card-inner">
                    <div className="project-media-wrap">
                      <img src={project.imageSrc} className="card-img-top project-image" alt={project.title} />
                      <span className="project-category-badge">{project.category}</span>
                    </div>

                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title project-title">{project.title}</h5>
                      <p className="card-text project-description">{project.description}</p>

                      <div className="project-actions d-flex gap-2 mt-auto">
                        {project.github && (
                          <a
                            href={project.github}
                            className="btn project-btn project-btn-code"
                            rel="noreferrer"
                            target="_blank"
                          >
                            GitHub
                          </a>
                        )}
                        {project.link && (
                          <a
                            href={project.link}
                            className="btn project-btn project-btn-live"
                            rel="noreferrer"
                            target="_blank"
                          >
                            Visit
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {!filteredProjects.length && (
                <div className="projects-empty">
                  <h4 className="mb-2">No projects in this category yet</h4>
                  <p className="mb-0">Choose another filter to explore more work.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Projects;