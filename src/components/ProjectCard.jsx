import React from 'react';
import { Card, Tag, Typography, Space, Button } from 'antd';
import { ArrowUpOutlined, ExperimentOutlined, CodeOutlined } from '@ant-design/icons';
const { Paragraph, Title, Text } = Typography;
export default function ProjectCard({ project, research }) {
  return <Card className="project-card" hoverable>
    <div className="project-card-top"><span className="project-icon">{research ? <ExperimentOutlined /> : <CodeOutlined />}</span><Text className="eyebrow-small">{research ? 'RESEARCH PROJECT' : project.category === 'academic' ? 'ACADEMIC PROJECT' : 'ENGINEERING PROJECT'}</Text></div>
    <Title level={4}>{project.title}</Title>
    <Paragraph className="project-description">{project.description}</Paragraph>
    <Space size={[6, 8]} wrap>{project.tags.map(tag => <Tag key={tag} className="skill-tag">{tag}</Tag>)}</Space>
    <div className="project-card-footer"><Text type="secondary">{project.status || (research ? 'Research' : 'Project')}</Text>{project.url ? <Button size="small" type="link" href={project.url} target="_blank" rel="noopener noreferrer">Project link <ArrowUpOutlined /></Button> : null}</div>
  </Card>;
}
