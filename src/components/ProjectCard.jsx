import React, { useRef } from 'react';
import { Card, Tag, Typography, Space, Button } from 'antd';
import { ArrowUpOutlined, ExperimentOutlined, CodeOutlined } from '@ant-design/icons';
import { projectStatus } from '../translations.js';
const { Paragraph, Title, Text } = Typography;
export default function ProjectCard({ project, research, language='en', t }) {
  const cardRef = useRef(null);
  const tilt = event => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || event.pointerType === 'touch') return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (event.clientX-r.left)/r.width-.5;
    const y = (event.clientY-r.top)/r.height-.5;
    el.style.setProperty('--rotate-x', `${-y*6}deg`);
    el.style.setProperty('--rotate-y', `${x*6}deg`);
    el.style.setProperty('--glow-x', `${(x+.5)*100}%`);
    el.style.setProperty('--glow-y', `${(y+.5)*100}%`);
  };
  const resetTilt = () => { const el=cardRef.current; if (el) {el.style.setProperty('--rotate-x','0deg');el.style.setProperty('--rotate-y','0deg');} };
  const localized = language === 'ko' ? project.ko : project;
  return <Card ref={cardRef} className="project-card depth-card" onPointerMove={tilt} onPointerLeave={resetTilt}>
    <div className="project-card-top"><span className="project-icon">{research ? <ExperimentOutlined /> : <CodeOutlined />}</span><Text className="eyebrow-small">{research ? t.researchProject : project.category === 'academic' ? t.academicProject : t.engineeringProject}</Text></div>
    <Title level={4}>{localized.title}</Title>
    <Paragraph className="project-description">{localized.description}</Paragraph>
    <Space size={[6, 8]} wrap>{project.tags.map(tag => <Tag key={tag} className="skill-tag">{tag}</Tag>)}</Space>
    <div className="project-card-footer"><Text type="secondary">{projectStatus(project.status,language,t)}</Text>{project.url ? <Button size="small" type="link" href={project.url} target="_blank" rel="noopener noreferrer">{t.projectLink} <ArrowUpOutlined /></Button> : null}</div>
  </Card>;
}
