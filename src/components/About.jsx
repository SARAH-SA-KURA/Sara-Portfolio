import React from 'react';
import useTilt from '../hooks/useTilt';

const About = () => {
  const tiltRef = useTilt(12);

  return (
    <section id="about">
      <p className="section-eyebrow">About me</p>
      <h2 className="section-title">Who I Am</h2>

      <div className="page2" ref={tiltRef}>
        <div className="baoutme">
          <p>
            I’m a passionate and creative developer. I hold a Bac+2 diploma in Digital Development
            from OFPPT, and with a background in audiovisual studies, I bring a unique blend of
            technical knowledge and artistic vision to everything I do.
          </p>
          <p>
            I enjoy turning ideas into real, functional digital experiences — whether that means building
            user-friendly websites, exploring the logic of code, or designing beautiful interfaces.
          </p>
          <p>
            Curious and motivated, I’m always eager to learn new tools, experiment with fresh ideas,
            and take on new challenges.
          </p>
          <p>
            Outside of coding, I have a deep appreciation for visual arts, photography, and nature.
          </p>
        </div>

        <div className="imageAbout" data-tilt>
          {/* A transparent cutout, not a photo in a frame: no crop, no border,
              just a glow behind it so the dark clothing reads against the page. */}
          <span className="about-glow" aria-hidden="true" />
          <img className="imagge" src="/sarah-about-cutout.png" alt="Sarah" width="1170" height="854" />
        </div>
      </div>
    </section>
  );
};

export default About;
