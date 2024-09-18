/**
 * Bio component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image";

import { ButtonLink } from "./button"

const Panel = ({ node }) => {

  const { frontmatter: data } = node;

  const queriedData = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author
        }
      }
    }
  `);

  const image = data.image && data.image.childImageSharp;


  const title = data.title || node.fields.slug;
  const authorSpans = data.authors.map(a => a.trim()).map((a, i) => {
    let style = styles.author;
    if (a.includes(queriedData.site.siteMetadata.author)) {
      style = { ...style, ...styles.authorEmph };
    }
    return (<React.Fragment>
      <span key={a} style={style}>{a}</span>
      {i !== data.authors.length - 1 && <span>, </span>}
    </React.Fragment>)
  });

  const links = [];
  if (data.paper) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.paper} name={"Paper"} />
    </div>);
  }
  if (data.website) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.website} name={"Website"} />
    </div>);
  }
  if (data.code) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.code} name={"Code"} />
    </div>);
  }
  if (data.slides) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.slides} name={"Slides"} />
    </div>);
  }
  if (data.video) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.video} name={"Video"} />
    </div>);
  }
  if (data.openreview) {
    links.push(<div style={styles.linkItem}>
      <ButtonLink to={data.openreview} name={"OpenReview"} />
    </div>);
  }
  // This has too much whitespace..
  const optionalText = data.optionalText && (<p>{data.optionalText}</p>);
  return (
    <div style={styles.container} key={node.fields.slug}>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <div style={styles.authors}>{authorSpans}</div>
        <small style={styles.pubInfo}>{data.pub_info}</small>
        <div style={styles.links}>{links}</div>
      </div>
      {image && (
        <div style={styles.imgContainer}>
          <Img fluid={image.fluid} alt={title} />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "2.5rem",
    padding: "1.25rem",
    // borderBottom: "1px solid #eee",
  },
  content: {
    flex: "1 1 50%", // Decreased from 65% to give more space to the image
    paddingRight: "1.5rem",
  },
  title: {
    fontSize: "1.3rem", // Decreased from 1.4rem
    marginBottom: "0.4rem",
  },
  authors: {
    fontSize: "0.9rem", // Decreased from 1rem (assuming it was 1rem before)
    marginBottom: "0.4rem",
  },
  pubInfo: {
    fontSize: "0.8rem", // Decreased from 0.9rem (assuming it was 0.9rem before)
    fontStyle: "italic",
    marginBottom: "0.4rem",
    color: "#666",
  },
  links: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  imgContainer: {
    flex: "0 0 50%", // Increased from 30% to allow image to take up more space
    maxWidth: "500px", // Increased from 350px
  },
  image: {
    width: "100%",
    height: "auto",
    objectFit: "contain", // Ensures the image maintains its aspect ratio
  },
}

export default Panel