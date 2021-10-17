import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { FiGithub, FiTwitter, FiLinkedin, FiFileText } from "react-icons/fi";
import { SiGithub, SiTwitter, SiLinkedin, SiFileText, SiGooglescholar } from "react-icons/si";

import Layout from "../components/layout"
import SEO from "../components/seo"
import Panel from "../components/panel"

// TODO add email (FiMail)
// TODO link status to CMS
// TODO move to YAML instead of frontmatter
class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const siteTitle = data.site.siteMetadata.title;

    const pfp = data.pfp.childImageSharp;

    const projectData = data.allMdx.edges;

    // https://stackoverflow.com/questions/52574783/gatsby-image-path-from-json
    // https://stackoverflow.com/questions/57515558/how-should-i-import-all-the-images-under-a-folder-in-gatsby
    const projectPanels = projectData.map(({ node }) => <Panel node={node} />);
    const projectPanelsBreak = [projectPanels[0]];
    for (let i = 1; i < projectPanels.length; i++) {
      projectPanelsBreak.push(<hr style={styles.divider}/>);
      projectPanelsBreak.push(projectPanels[i]);
    }

    const spotlightLinks = [
      { link: "https://twitter.com/_JoelYe", icon: FiTwitter, title: "Twitter" },
      { link: "https://github.com/joel99", icon: FiGithub, title: "GitHub" },
      { link: "https://www.linkedin.com/in/joelye/", icon: FiLinkedin, title: "LinkedIn" },
      { link: "/resume.pdf", icon: FiFileText, title: "Resume" },
      { link: "https://scholar.google.com/citations?user=CUrST4oAAAAJ&hl=en", icon: SiGooglescholar, title: "Google Scholar" },
    ];

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="Home"
          keywords={[`blog`, `joel`, `portfolio`]}
        />
        <div style={styles.header}>
          <div style={styles.profile}>
            <Img fluid={pfp.fluid} />
          </div>
          <div style={styles.spotlight}>
            {/* <h3> Researcher &amp; Developer </h3> */}
            <h4> NeuroAI PhD student </h4>
            {/* <p> MS @ Georgia Tech &#8594; PhD student @ CMU </p> */}
            <p> Say hello: joelye9 at gmail dot com </p>
            <div style={styles.links}>
              {spotlightLinks.map(sl => <PaddedLink {...sl} />)}
            </div>
          </div>
        </div>
        <section>
          <h3>Bio</h3>
          <p>
            I am a PhD student in the <a href="https://www.cmu.edu/ni/academics/pnc/">Program in Neural Computation at CMU</a>, rotating with <a href="https://scholar.google.com/citations?hl=en&user=kKE_lJUAAAAJ">Aaron Batista</a> and <a href="https://www.cs.cmu.edu/~lwehbe/">Leila Wehbe</a>. My research aims to relate computation in the brain and in AI systems, and to develop deep learning systems for bi-directional brain-computer interfaces.
          </p>

          <p>
            In my Master's I researched embodied navigation with <a href="https://www.cc.gatech.edu/~dbatra/">Dhruv Batra</a>, <a href="https://wijmans.xyz/">Erik Wijmans</a>, and <a href="https://abhishekdas.com/">Abhishek Das</a>. I also worked on modeling neural data with <a href="https://scholar.google.com/citations?user=M3-z9G4AAAAJ&hl=en">Chethan Pandarinath</a>.
          </p>

          <p> I grew up in NYC, where I graduated from Stuyvesant High School, and I did my undergrad in Computer Science at Georgia Tech. During my undergrad, I was Director of Technology for Georgia Tech's hackathon org, <a href="https://hack.gt/">HackGT</a>, where we worked to host events to promote CS education. </p>

          <p> Hobbies I make time for include <a href="https://www.goodreads.com/user/show/97533622-joel-ye">reading</a> (and am always open to recommendations) and studying Japanese and Chinese.</p>
        </section>
        <section>
          {data.news.nodes.map(RemarkTemplate)}
        </section>
        <hr />
        <section>
          <h3>Projects</h3>
          {projectPanelsBreak}
        </section>
      </Layout>
    )
  }
}

const RemarkTemplate = ({
  html
}) => (
  <div
    className="blog-post-content"
    dangerouslySetInnerHTML={{ __html: html }}
  />
);

// TODO how can we get the alt to fire on the div?
const PaddedLink = ({link, icon: Icon, ...other}) => (
  <Link to={link} style={styles.linkMargin}>
    <div style={styles.paddedIcon}>
      <Icon {...other} />
    </div>
  </Link>
);

const styles = {
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  profile: {
    margin: 0,
    minWidth: "300px",
    width: "12em",
    paddingRight: "1em",
  },
  spotlight: {
    display: "flex",
    flexDirection: "column"
  },
  links: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1.1em",
    width: "100%",
    position: "relative",
    left: "-0.5em",
  },
  paddedIcon: {
    padding: "0.5em",
  },
  linkMargin: {
    margin: "0.5em"
  },
  divider: {
    margin: "2.0em 0em 1.0em",
    color: "#bbbbbb"
  }
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    pfp: file(relativePath: { eq: "pfp_small.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
    news: allMarkdownRemark {
      nodes {
        html
      }
    }
    allMdx(
      filter: { fileAbsolutePath: {regex: "/content/projects/"}},
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            pub_info
            authors
            paper
            code
            website
            slides
            video
            title
            # optionalText
            image {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`