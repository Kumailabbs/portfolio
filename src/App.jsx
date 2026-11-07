import React, { useEffect, useMemo, useState } from 'react';
import { Button, Card, Col, Drawer, Grid, Layout, Row, Segmented, Space, Tag, Timeline, Typography } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined, CodeOutlined, ExperimentOutlined, LinkedinOutlined, MailOutlined, MenuOutlined, EnvironmentOutlined, BookOutlined, GlobalOutlined } from '@ant-design/icons';
import ProjectCard from './components/ProjectCard.jsx';
import ResearchScene3D from './components/ResearchScene3D.jsx';
import data from './data.json';
import { ui } from './translations.js';
const { Header, Content, Footer } = Layout;
const { Title, Text, Paragraph } = Typography;
const sections=['about','research','engineering','experience','skills','education','languages','contact'];
const linkedin='https://www.linkedin.com/in/kumailabbs/';
const email='cumaillabbas@gmail.com';
function SectionHead({count,kicker,title,description}) {return <div className="section-head"><div><div className="section-kicker">{count} / {kicker}</div><Title level={2}>{title}</Title></div><Paragraph>{description}</Paragraph></div>}
function SkillTags({items}) {return <Space size={[6,9]} wrap>{items.map(x=><Tag className="skill-tag" key={x}>{x}</Tag>)}</Space>}
export default function App(){
 const screens=Grid.useBreakpoint();
 const [drawerOpen,setDrawerOpen]=useState(false);
 const [language,setLanguage]=useState(()=>{try{return localStorage.getItem('portfolio-language')==='ko'?'ko':'en'}catch{return 'en'}});
 const [researchFilter,setResearchFilter]=useState('all');
 const [engineeringFilter,setEngineeringFilter]=useState('all');
 const t=ui[language];
 useEffect(()=>{document.documentElement.lang=language;document.title=language==='ko'?'Kumail Abbas | AI 연구원 & 소프트웨어 엔지니어':'Kumail Abbas | AI Researcher & Software Engineer';try{localStorage.setItem('portfolio-language',language)}catch{}},[language]);
 const filteredResearch=useMemo(()=>data.research.filter(x=>researchFilter==='all'||(researchFilter==='imaging'?x.category==='imaging':x.category==='behavior')),[researchFilter]);
 const filteredEngineering=useMemo(()=>data.engineering.filter(x=>engineeringFilter==='all'||x.category===engineeringFilter),[engineeringFilter]);
 const go=id=>{setDrawerOpen(false);document.getElementById(id)?.scrollIntoView({behavior:'smooth'})};
 const localeControl=<div className="locale-switch" aria-label={language==='ko'?'사이트 언어 선택':'Website language'}><GlobalOutlined /><Segmented size="small" value={language} onChange={setLanguage} options={[{label:'EN',value:'en'},{label:'한국어',value:'ko'}]} aria-label="Language" /></div>;
 return <Layout className="site-layout">
  <Header className="site-header"><div className="shell header-inner"><a href="#home" className="wordmark" aria-label="Kumail Abbas home">KA<span>.</span></a>
    <div className="header-controls">{screens.lg?<nav className="nav-items" aria-label="Main navigation">{sections.map((id,i)=><a href={'#'+id} key={id}>{t.nav[i]}</a>)}<Button type="primary" onClick={()=>go('contact')}>{t.talk} <ArrowUpOutlined /></Button></nav>:null}
    {localeControl}
    {!screens.lg?<Button className="mobile-menu" icon={<MenuOutlined />} onClick={()=>setDrawerOpen(true)} aria-label={t.explore}/>:null}</div></div></Header>
  <Drawer title={t.explore} placement="right" open={drawerOpen} onClose={()=>setDrawerOpen(false)}><div className="drawer-links">{sections.map((id,i)=><Button type="text" block key={id} onClick={()=>go(id)}>{t.nav[i]}</Button>)}</div></Drawer>
  <Content>
   <section id="home" className="hero hero-cover"><div className="cover-scene" aria-label="Interactive 3D research visualization"><ResearchScene3D /></div><div className="cover-shade" aria-hidden="true"/><div className="shell cover-content"><div className="cover-intro">
    <div className="eyebrow"><span className="status-dot"/> {t.status}</div>
    <h1>{t.hero1}<br/><span>{t.hero2}</span></h1>
    <Paragraph className="hero-copy">{t.heroIntro} <strong>Kumail Abbas</strong>, {t.heroBody} <strong>{t.heroEmphasis}</strong></Paragraph>
    <Space wrap size={12} className="hero-actions"><Button type="primary" size="large" onClick={()=>go('research')}>{t.exploreResearch} <ArrowRightOutlined /></Button><Button size="large" onClick={()=>go('engineering')}>{t.viewEngineering} <CodeOutlined /></Button><Button size="large" href={linkedin} target="_blank" rel="noopener noreferrer" icon={<LinkedinOutlined />}>LinkedIn</Button></Space>
    <div className="hero-meta"><span><EnvironmentOutlined /> {t.location}</span><span><BookOutlined /> {t.master}</span><span><ExperimentOutlined /> {t.field}</span></div>
    </div><div className="cover-scroll-hint"><ArrowDownOutlined /> {t.scroll}</div>
    <div className="metrics"><div><strong>2022–{language==='ko'?'현재':'Present'}</strong><span>{t.metric1}</span></div><div><strong>4</strong><span>{t.metric2}</span></div><div><strong>9</strong><span>{t.metric3}</span></div><div><strong>{language==='ko'?'2개 분야':'2 domains'}</strong><span>{t.metric4}</span></div></div>
   </div></section>
   <section id="about" className="page-section"><div className="shell"><SectionHead count="01" kicker={t.aboutK} title={t.aboutT} description={t.aboutD}/><Row gutter={[32,24]}><Col xs={24} lg={14}><div className="about-copy"><p>{t.aboutP1}</p><p>{t.aboutP2}</p><p>{t.aboutP3}</p></div></Col><Col xs={24} lg={10}><Card className="highlight-card"><Title level={4}>{t.interest}</Title><SkillTags items={['Medical Image Analysis','Computer Vision','Explainable AI','Domain Shift','Time-Series Deep Learning','VR Behavioral Analytics','Multimodal Learning','Healthcare AI']}/></Card></Col></Row></div></section>
   <section id="research" className="page-section"><div className="shell"><SectionHead count="02" kicker={t.researchK} title={t.researchT} description={t.researchD}/><Segmented className="project-filter" value={researchFilter} onChange={setResearchFilter} options={[{value:'all',label:t.all},{value:'imaging',label:t.imaging},{value:'behavior',label:t.behavior}]}/><Row gutter={[18,18]}>{filteredResearch.map(p=><Col xs={24} md={12} key={p.id}><ProjectCard project={p} research language={language} t={t}/></Col>)}</Row><p className="section-note">{t.researchNote}</p></div></section>
   <section id="engineering" className="page-section"><div className="shell"><SectionHead count="03" kicker={t.engineeringK} title={t.engineeringT} description={t.engineeringD}/><Segmented className="project-filter" value={engineeringFilter} onChange={setEngineeringFilter} options={[{value:'all',label:t.all},{value:'industry',label:t.industry},{value:'academic',label:t.academic}]}/><Row gutter={[18,18]}>{filteredEngineering.map(p=><Col xs={24} md={12} key={p.id}><ProjectCard project={p} language={language} t={t}/></Col>)}</Row><p className="section-note">{t.engineeringNote}</p></div></section>
   <section id="experience" className="page-section"><div className="shell"><SectionHead count="04" kicker={t.experienceK} title={t.experienceT} description={t.experienceD}/><Timeline className="career-timeline" items={data.experience.map((j,i)=>({color:i===0?'green':'blue',children:<Card className="career-card"><div className="job-heading"><div><Title level={4}>{language==='ko'?j.ko.role:j.role}</Title><Text className="company-name">{j.company}</Text></div><Text className="job-period">{j.period.replace('Present',language==='ko'?'현재':'Present')}</Text></div><Paragraph>{language==='ko'?j.ko.description:j.description}</Paragraph><SkillTags items={j.tags}/></Card>}))}/></div></section>
   <section id="skills" className="page-section"><div className="shell"><SectionHead count="05" kicker={t.skillsK} title={t.skillsT} description={t.skillsD}/><Row gutter={[18,18]}>{data.skills.map(g=><Col xs={24} md={12} lg={8} key={g.title}><Card className="skill-card"><Title level={4}>{language==='ko'?g.ko.title:g.title}</Title><SkillTags items={g.items}/></Card></Col>)}</Row></div></section>
   <section id="education" className="page-section"><div className="shell"><SectionHead count="06" kicker={t.educationK} title={t.educationT} description={t.educationD}/><Row gutter={[18,18]}>{data.education.map(e=>{const v=language==='ko'?e.ko:e;return <Col xs={24} md={12} key={e.degree}><Card className="education-card"><Text className="eyebrow-small">{v.heading}</Text><Title level={4}>{v.degree}</Title>{v.details.map((line,i)=><Paragraph key={i}>{line}</Paragraph>)}</Card></Col>})}</Row></div></section>
   <section id="languages" className="page-section"><div className="shell"><SectionHead count="07" kicker={t.languagesK} title={t.languagesT} description={t.languagesD}/><Row gutter={[16,16]}>{data.languages.map(item=><Col xs={24} sm={12} lg={8} key={item.name}><Card className="language-card"><div className="language-card-inner"><div><Text className="language-title">{language==='ko'?item.koName:item.name}</Text>{language==='ko'?<Text className="language-alt">{item.name}</Text>:null}</div><Tag className={'language-level '+item.kind}>{language==='ko'?item.koLevel:item.level}</Tag></div></Card></Col>)}</Row></div></section>
   <section id="credentials" className="page-section"><div className="shell"><SectionHead count="08" kicker={t.credentialsK} title={t.credentialsT} description={t.credentialsD}/><Row gutter={[18,18]}><Col xs={24} md={12}><Card className="education-card"><Title level={4}>{t.courses}</Title><ul className="course-list">{data.certifications.map(c=><li key={c}>{c}</li>)}</ul></Card></Col><Col xs={24} md={12}><Card className="education-card"><Title level={4}>{t.community}</Title><Paragraph>{t.communityP1}</Paragraph><Paragraph>{t.communityP2}</Paragraph></Card></Col></Row></div></section>
   <section id="contact" className="page-section"><div className="shell"><div className="contact-banner"><div><Text className="section-kicker">09 / {t.contactK}</Text><Title level={2}>{t.contactT}</Title><Paragraph>{t.contactD}</Paragraph></div><Space size={10} wrap><Button size="large" type="primary" href={linkedin} target="_blank" rel="noopener noreferrer" icon={<LinkedinOutlined />}>LinkedIn</Button><Button size="large" href={'mailto:'+email} icon={<MailOutlined />}>Email</Button></Space></div></div></section>
  </Content><Footer className="site-footer"><div className="shell footer-inner"><Text>© {new Date().getFullYear()} Kumail Abbas · {t.copyright}</Text><Space><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpOutlined /></a><a href="#home">{t.back} ↑</a></Space></div></Footer>
 </Layout>;
}
