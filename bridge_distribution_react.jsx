import { useState, useEffect, useRef } from "react";
import { ChevronDown, ArrowRight, Send, Phone, Mail, MapPin, Menu, X, Package, Truck, BarChart3, Shield, Users, Zap, Award, Star, ChevronRight } from "lucide-react";

const LOGO_B64 = "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rpDZugOn1XHFWRx1DY45mTZWAFzNr/+W91kRVu9k7ZW+NvH5v7tmdO+TTMT8DAC8HV3dzAka9OXNIRegnOZgs5uhcATvsNysyLHxkvea8f4dP7adP2+o07YK+C8ObD6yjNVFTyS5cpldlabOB3/AHfqPEjNjsrZsXqJGSiUF3zjnp4ae2nTRYUWZ3kp26o44xv6asf7n9P3KO+T1PaGtp6uhq2tdBxY59C14u+MkFp313Og2truvOwUz5qeeZrm2hALm8yDz9PxXBFO6vnd1FOrFbJrb1bXyz9PURjpWEFppm3pKp2Zgs1uhcATryHP0WZFrUKzoy1Lwa+aa/5MtZLnZquZQ0lS972AGeEvaSLuZ3w6wO9rhYsdZEzEHNgcwxZW5csgeALW3CwIrpXs5Wyt2lhfPlv65+i8zGnfJbxZjKhstdFiMbmOjF4y+zzd18tvqfHlbVSooOJTSzcWJvDt3HOAc6/Qc1xRQr3CrVXUcd3nPPL7/wAjKWFgIiLWMhERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREAREQBERAEREB/9k=";

const GF = "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,300;0,400;0,600;0,700;0,800;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap";

/* ── tokens ── */
const C = {
  bg:    "#07070f",
  bg2:   "#0d0d1a",
  bg3:   "#131325",
  blue:  "#1428e0",
  blue2: "#2a3ff5",
  red:   "#d41212",
  red2:  "#f02222",
  white: "#e8e8f5",
  gray:  "#7878a0",
};

/* ── animation keyframes injected once ── */
const STYLES = `
@import url('${GF}');
*,*::before,*::after{box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:${C.bg};color:${C.white};font-family:'DM Sans',sans-serif;margin:0;overflow-x:hidden;}
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-track{background:${C.bg};}
::-webkit-scrollbar-thumb{background:${C.blue};border-radius:4px;}
.bc{font-family:'Barlow Condensed',sans-serif;}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
@keyframes orbFloat{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(24px,-32px) scale(1.08);}}
@keyframes pulse{0%,100%{box-shadow:0 8px 32px rgba(20,40,224,.35);}50%{box-shadow:0 8px 52px rgba(20,40,224,.65);}}
@keyframes progressBar{from{width:0%;}to{width:100%;}}
@keyframes ticker{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.fadeUp{animation:fadeUp .7s ease both;}
.fd1{animation-delay:.1s;} .fd2{animation-delay:.2s;} .fd3{animation-delay:.3s;} .fd4{animation-delay:.4s;}
.orb1{animation:orbFloat 9s ease-in-out infinite;}
.orb2{animation:orbFloat 7s ease-in-out infinite reverse;}
.ticker-inner{animation:ticker 32s linear infinite;}
`;

/* ── tiny helpers ── */
const Tag = ({ children }) => (
  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", color:C.red2, display:"flex", alignItems:"center", gap:8 }}>
    <span style={{ display:"inline-block", width:22, height:2, background:C.red2 }} />
    {children}
  </span>
);

const Btn = ({ children, variant="primary", onClick, style={} }) => {
  const [hov, setHov] = useState(false);
  const base = { display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", borderRadius:4, fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", cursor:"pointer", border:"none", transition:"all .3s", ...style };
  const vars = {
    primary: { background: hov ? C.blue2 : C.blue, color:"#fff", boxShadow: hov ? "0 0 48px rgba(20,40,224,.6)" : "0 0 28px rgba(20,40,224,.35)", transform: hov ? "translateY(-2px)" : "none" },
    red:     { background: hov ? C.red2  : C.red,  color:"#fff", boxShadow: hov ? "0 0 48px rgba(212,18,18,.6)" : "0 0 28px rgba(212,18,18,.3)",  transform: hov ? "translateY(-2px)" : "none" },
    outline: { background:"transparent", color:C.white, border: hov ? `1px solid ${C.blue}` : `1px solid rgba(255,255,255,.2)`, transform: hov ? "translateY(-2px)" : "none" },
  };
  return <button onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick} style={{...base,...vars[variant]}}>{children}</button>;
};

const Card = ({ children, style={}, hoverBorder=true }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ background:"rgba(255,255,255,.03)", border:`1px solid ${hov && hoverBorder ? "rgba(20,40,224,.45)" : "rgba(255,255,255,.07)"}`, borderRadius:12, transition:"all .3s", transform: hov ? "translateY(-5px)" : "none", boxShadow: hov ? "0 24px 60px rgba(0,0,0,.5)" : "none", ...style }}>
      {children}
    </div>
  );
};

/* ── nav pages ── */
const NAV = [
  { id:"home",     label:"Home" },
  { id:"about",    label:"About" },
  { id:"products", label:"Products" },
  { id:"brand",    label:"Brand" },
  { id:"careers",  label:"Careers" },
  { id:"support",  label:"Support" },
];

/* ══════════════════════════════════════════ PAGES ══════════════════════════════════════════ */

/* HOME */
function PageHome({ nav }) {
  const [counts, setCounts] = useState([0,0,0,0]);
  const targets = [25, 500, 1200, 98];
  useEffect(() => {
    const timers = targets.map((t, i) => {
      const step = t / 60;
      let c = 0;
      return setInterval(() => {
        c = Math.min(c + step, t);
        setCounts(prev => { const n=[...prev]; n[i]=Math.round(c); return n; });
        if(c>=t) clearInterval(timers?.[i]);
      }, 20);
    });
    return () => timers.forEach(clearInterval);
  }, []);

  const stats = [
    { num: counts[0], suf:"+", label:"Years of Excellence" },
    { num: counts[1], suf:"+", label:"Partner Brands" },
    { num: counts[2], suf:"+", label:"Distribution Points" },
    { num: counts[3], suf:"%", label:"On-Time Delivery Rate" },
  ];

  const features = [
    { icon: <Package size={24}/>, title:"Warehouse & Logistics", desc:"State-of-the-art warehousing with automated inventory management, real-time tracking, and rapid fulfillment across the Philippines." },
    { icon: <Truck size={24}/>, title:"National Distribution", desc:"A robust fleet and strategic partner network covering every key market — from supermarkets to sari-sari stores nationwide." },
    { icon: <BarChart3 size={24}/>, title:"Market Intelligence", desc:"Data-driven insights on sell-through, market penetration, and competitive landscape to turn distribution data into strategic advantage." },
  ];

  const whyPoints = [
    { icon: <Users size={20}/>, title:"Long-Term Partnerships", desc:"Dedicated account management, in-market support, and transparent reporting." },
    { icon: <Shield size={20}/>, title:"Compliance & Quality", desc:"Rigorous QC protocols and regulatory compliance standards to protect your brand." },
    { icon: <Zap size={20}/>, title:"Lightning-Fast Fulfillment", desc:"98% on-time delivery SLA across all active routes and territories." },
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{ minHeight:"calc(100vh - 68px)", display:"flex", alignItems:"center", position:"relative", overflow:"hidden", padding:"0 32px" }}>
        <div style={{ position:"absolute", inset:0, pointerEvents:"none" }}>
          <div className="orb1" style={{ position:"absolute", width:640, height:640, borderRadius:"50%", background:"rgba(20,40,224,.22)", filter:"blur(90px)", top:-160, right:-80 }} />
          <div className="orb2" style={{ position:"absolute", width:420, height:420, borderRadius:"50%", background:"rgba(212,18,18,.13)", filter:"blur(80px)", bottom:0, left:"8%" }} />
        </div>
        {/* Geometric arc */}
        <svg style={{ position:"absolute", right:0, top:"50%", transform:"translateY(-50%)", width:"50%", opacity:.1, pointerEvents:"none" }} viewBox="0 0 600 500">
          <ellipse cx="300" cy="250" rx="290" ry="230" stroke="white" strokeWidth="1.5" strokeDasharray="8 6" fill="none"/>
          <path d="M 40 250 Q 180 40 440 130 T 580 250" stroke="#1428e0" strokeWidth="3" fill="none"/>
          <path d="M 70 280 Q 210 60 460 155 T 580 290" stroke="#d41212" strokeWidth="2" fill="none" opacity="0.6"/>
          <circle cx="300" cy="250" r="7" fill="#1428e0" opacity="0.7"/>
          <circle cx="440" cy="130" r="5" fill="#d41212" opacity="0.7"/>
        </svg>

        <div style={{ position:"relative", zIndex:2, maxWidth:800 }}>
          <div className="fadeUp"><Tag>Trusted Distribution Partner</Tag></div>
          <h1 className="bc fadeUp fd1" style={{ fontSize:"clamp(3.2rem,8vw,7rem)", fontWeight:900, lineHeight:.95, margin:"20px 0 24px", letterSpacing:"-0.01em" }}>
            Bridging <span style={{ color:C.blue2 }}>Markets,</span>
            <br/><em style={{ fontStyle:"italic", fontSize:"82%", fontWeight:700, color:"rgba(232,232,245,.85)" }}>
              Delivering <span style={{ color:C.red2 }}>Excellence.</span>
            </em>
          </h1>
          <p className="fadeUp fd2" style={{ fontSize:"1.05rem", color:C.gray, maxWidth:500, marginBottom:36, fontWeight:300, lineHeight:1.8 }}>
            Bridge Distribution, Inc. connects manufacturers to markets with precision, speed, and reliability. We don't just move products — we build the pathways that power commerce.
          </p>
          <div className="fadeUp fd3" style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <Btn onClick={()=>nav("products")}><ArrowRight size={16}/>Explore Products</Btn>
            <Btn variant="outline" onClick={()=>nav("about")}>Our Story</Btn>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background:C.blue, padding:"10px 0", overflow:"hidden" }}>
        <div className="ticker-inner" style={{ display:"flex", gap:60, whiteSpace:"nowrap", width:"max-content" }}>
          {["Distribution Excellence","Nationwide Coverage","Trusted Partnerships","Market Intelligence","On-Time Delivery","500+ Partner Brands","Quality Guaranteed","Philippine Market Leaders",
            "Distribution Excellence","Nationwide Coverage","Trusted Partnerships","Market Intelligence","On-Time Delivery","500+ Partner Brands","Quality Guaranteed","Philippine Market Leaders"].map((t,i)=>(
            <span key={i} className="bc" style={{ fontSize:13, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(255,255,255,.9)" }}>
              {t} <span style={{ color:"rgba(255,255,255,.5)" }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* STATS */}
      <section style={{ background:C.bg2, borderTop:`1px solid rgba(255,255,255,.07)`, borderBottom:`1px solid rgba(255,255,255,.07)`, padding:"60px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)" }}>
          {stats.map((s,i)=>(
            <div key={i} style={{ textAlign:"center", padding:"24px 32px", borderRight: i<3 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
              <div className="bc" style={{ fontSize:"3.6rem", fontWeight:900, lineHeight:1, display:"flex", alignItems:"baseline", justifyContent:"center", gap:2 }}>
                <span>{s.num.toLocaleString()}</span>
                <span style={{ fontSize:"2rem", color: i===3 ? C.blue2 : C.red2 }}>{s.suf}</span>
              </div>
              <div className="bc" style={{ fontSize:13, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.gray, marginTop:8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:"100px 32px", maxWidth:1160, margin:"0 auto" }}>
        <Tag>What We Do</Tag>
        <h2 className="bc" style={{ fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:800, margin:"14px 0 50px" }}>Built for Scale.<br/>Designed for Speed.</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:2, border:`1px solid rgba(255,255,255,.07)` }}>
          {features.map((f,i)=>{
            const [hov, setHov]=useState(false);
            return (
              <div key={i} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                style={{ background: hov ? "rgba(255,255,255,.05)" : "rgba(255,255,255,.02)", padding:"40px 34px", borderRight: i<2 ? `1px solid rgba(255,255,255,.07)` : "none", position:"relative", overflow:"hidden", transition:"background .3s" }}>
                <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${C.blue},${C.red})`, transform: hov ? "scaleX(1)" : "scaleX(0)", transformOrigin:"left", transition:"transform .4s" }} />
                <div style={{ width:50, height:50, background:"rgba(20,40,224,.1)", border:"1px solid rgba(20,40,224,.22)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:22, color:C.blue2 }}>{f.icon}</div>
                <h3 className="bc" style={{ fontSize:"1.45rem", fontWeight:700, marginBottom:10 }}>{f.title}</h3>
                <p style={{ color:C.gray, fontSize:"0.9rem", lineHeight:1.75 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHY */}
      <section style={{ background:C.bg2, padding:"100px 32px", position:"relative", overflow:"hidden" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
          <div style={{ position:"relative", height:380 }}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg,${C.bg3},${C.bg2})`, border:`1px solid rgba(255,255,255,.07)`, borderRadius:12, padding:36, display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
              <div className="bc" style={{ fontSize:"5rem", fontWeight:900, lineHeight:1 }}><span style={{ color:C.blue2 }}>98</span>%</div>
              <p style={{ color:C.gray, fontSize:"0.9rem", marginTop:8 }}>Average on-time delivery SLA across all active routes</p>
            </div>
            <div style={{ position:"absolute", top:28, right:-16, background:C.blue, color:"#fff", padding:"14px 22px", borderRadius:6, fontFamily:"'Barlow Condensed',sans-serif", fontWeight:700, fontSize:13, letterSpacing:"0.08em", animation:"pulse 3s ease-in-out infinite" }}>
              ⚡ Lightning-Fast
            </div>
          </div>
          <div>
            <Tag>Why Bridge</Tag>
            <h2 className="bc" style={{ fontSize:"clamp(2.2rem,4vw,3.5rem)", fontWeight:800, margin:"14px 0 28px" }}>The Bridge<br/>Advantage</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {whyPoints.map((p,i)=>{
                const [hov,setHov]=useState(false);
                return (
                  <div key={i} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                    style={{ display:"flex", gap:18, padding:22, background:"rgba(255,255,255,.03)", border:`1px solid ${hov?"rgba(20,40,224,.4)":"rgba(255,255,255,.07)"}`, borderRadius:10, transition:"border-color .3s" }}>
                    <div style={{ width:42, height:42, background:"rgba(20,40,224,.1)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:C.blue2 }}>{p.icon}</div>
                    <div>
                      <h4 className="bc" style={{ fontSize:"1.1rem", fontWeight:700, marginBottom:4 }}>{p.title}</h4>
                      <p style={{ color:C.gray, fontSize:"0.87rem" }}>{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:"90px 32px", background:`linear-gradient(135deg,#0c0c1e,#0f0a1e)`, position:"relative", textAlign:"center", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(20,40,224,.07),rgba(212,18,18,.07))" }} />
        <div style={{ position:"relative" }}>
          <Tag style={{ justifyContent:"center", display:"flex" }}>Let's Work Together</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,5vw,4.5rem)", fontWeight:800, margin:"16px 0 16px" }}>Ready to Bridge<br/>Your Market?</h2>
          <p style={{ color:C.gray, maxWidth:500, margin:"0 auto 36px", fontWeight:300 }}>Whether you're a global brand entering the Philippine market or a local manufacturer scaling up — we have the network to make it happen.</p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <Btn onClick={()=>nav("support")}><Send size={15}/>Contact Our Team</Btn>
            <Btn variant="outline" onClick={()=>nav("careers")}>Join Our Team</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ABOUT */
function PageAbout({ nav }) {
  const values = [
    { n:"01", title:"Integrity",    desc:"We operate with full transparency, honoring every commitment to our partners, clients, and employees." },
    { n:"02", title:"Excellence",   desc:"We set high standards and pursue them relentlessly — in service delivery, performance, and team development." },
    { n:"03", title:"Partnership",  desc:"We believe in growing together. When our partners succeed, we succeed." },
    { n:"04", title:"Innovation",   desc:"We continuously adopt new technologies and processes to stay ahead in a dynamic market." },
  ];
  const milestones = [
    { year:"Est. ~2000", title:"Foundation", desc:"Bridge Distribution, Inc. is founded with a vision to connect quality brands to the Philippine market." },
    { year:"Early Growth", title:"Regional Expansion", desc:"Expanded beyond Metro Manila, establishing hubs across Luzon." },
    { year:"Mid-Stage",    title:"National Reach", desc:"Achieved full national coverage with Visayas and Mindanao networks." },
    { year:"Recent",       title:"Digital Transformation", desc:"Invested in ERP, route management, and analytics platforms to modernize operations." },
    { year:"Today",        title:"Industry Leader", desc:"500+ brands, 1,200+ trade accounts served nationwide.", highlight:true },
  ];
  return (
    <div>
      <section style={{ padding:"90px 32px 80px", position:"relative", overflow:"hidden", borderBottom:`1px solid rgba(255,255,255,.07)` }}>
        <div style={{ position:"absolute", inset:0 }}><div className="orb1" style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"rgba(20,40,224,.18)", filter:"blur(90px)", top:-160, right:-80 }} /></div>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative" }}>
          <Tag>Our Story</Tag>
          <h1 className="bc" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:900, margin:"14px 0 20px" }}>About Bridge<br/><span style={{ color:C.blue2 }}>Distribution</span></h1>
          <p style={{ color:C.gray, maxWidth:520, fontWeight:300, lineHeight:1.8 }}>Founded on the principle that great products deserve great distribution, Bridge Distribution, Inc. has grown from a small regional distributor to a nationally recognized logistics company.</p>
        </div>
      </section>

      {/* Story + Milestones */}
      <section style={{ padding:"100px 32px", maxWidth:1160, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80 }}>
        <div>
          <h2 className="bc" style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:800, marginBottom:24 }}>Building Bridges<br/>Since Day One</h2>
          <p style={{ color:C.gray, lineHeight:1.85, marginBottom:16, fontSize:"0.94rem" }}>Bridge Distribution, Inc. was established with a singular mission: to create a seamless connection between world-class brands and the Filipino consumer.</p>
          <p style={{ color:C.gray, lineHeight:1.85, marginBottom:16, fontSize:"0.94rem" }}>We have built an extensive network of trade partners, a dedicated logistics fleet, and a team of seasoned professionals committed to operational excellence.</p>
          <div style={{ borderLeft:`3px solid ${C.blue}`, paddingLeft:22, margin:"28px 0" }}>
            <p style={{ fontSize:"1.05rem", fontStyle:"italic", color:C.white }}>
              "We don't just deliver products. We deliver on our promise — every time, to every corner of the market."
            </p>
          </div>
          <Btn onClick={()=>nav("support")} style={{ marginTop:8 }}><ArrowRight size={15}/>Partner With Us</Btn>
        </div>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {milestones.map((m,i)=>(
            <div key={i} style={{ display:"flex", gap:20, paddingBottom:30, position:"relative" }}>
              {i < milestones.length-1 && <div style={{ position:"absolute", left:16, top:34, bottom:0, width:1, background:"rgba(255,255,255,.07)" }} />}
              <div style={{ flexShrink:0, width:32, height:32, borderRadius:"50%", background:C.bg2, border:`2px solid ${m.highlight ? C.red : C.blue}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, color:m.highlight?C.red2:C.blue2, fontWeight:700, fontFamily:"'Barlow Condensed',sans-serif" }}>●</div>
              <div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.12em", color:C.red2, textTransform:"uppercase", marginBottom:3 }}>{m.year}</div>
                <h4 className="bc" style={{ fontSize:"1.1rem", fontWeight:700, marginBottom:3 }}>{m.title}</h4>
                <p style={{ color:C.gray, fontSize:"0.87rem" }}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ background:C.bg2, padding:"100px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>Our Values</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>The Principles<br/>We Stand By</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {values.map((v,i)=>(
              <Card key={i} style={{ padding:"32px 26px" }}>
                <div className="bc" style={{ fontSize:"3.5rem", fontWeight:900, color:"rgba(20,40,224,.12)", lineHeight:1, marginBottom:12 }}>{v.n}</div>
                <h4 className="bc" style={{ fontSize:"1.3rem", fontWeight:700, marginBottom:10 }}>{v.title}</h4>
                <p style={{ color:C.gray, fontSize:"0.87rem", lineHeight:1.75 }}>{v.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding:"100px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>Leadership</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>Meet the Team</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:22 }}>
            {["Chief Executive Officer","Chief Operations Officer","VP of Sales","VP of Logistics"].map((role,i)=>(
              <Card key={i} style={{ overflow:"hidden" }}>
                <div style={{ height:200, background:`linear-gradient(135deg,${C.bg3},${C.bg2})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:56 }}>👤</div>
                <div style={{ padding:"20px 22px" }}>
                  <h4 className="bc" style={{ fontSize:"1.1rem", fontWeight:700 }}>Sample Name</h4>
                  <div className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.blue2, marginTop:4 }}>{role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* PRODUCTS */
function PageProducts() {
  const [activeFilter, setActiveFilter] = useState("all");
  const products = [
    { cat:"beverage", icon:"🥤", title:"Premium Beverage Line",    desc:"RTDs, juices, energy drinks, and functional beverages distributed to major retail chains nationwide.", skus:"500+ SKUs", badge:"Featured" },
    { cat:"food",     icon:"🍪", title:"Snacks & Confectionery",   desc:"International confectionery brands to local snack favorites — fastest-moving categories in the market.", skus:"300+ SKUs" },
    { cat:"personal", icon:"🧴", title:"Health & Beauty",          desc:"Personal care, health, and beauty products distributed to pharmacies and supermarkets.", skus:"200+ SKUs" },
    { cat:"household",icon:"🏠", title:"Home & Cleaning",          desc:"Trusted household brands distributed with care to every corner of the market.", skus:"150+ SKUs" },
    { cat:"food",     icon:"🌾", title:"Dry Goods & Staples",      desc:"Core pantry staples including rice, canned goods, condiments, and cooking essentials.", skus:"400+ SKUs", badge:"New" },
    { cat:"specialty",icon:"⭐", title:"Import & Specialty Brands",desc:"Exclusive distribution partnerships with select international brands entering the Philippine market.", skus:"Exclusive" },
  ];
  const filters = ["all","beverage","food","personal","household","specialty"];
  const filtered = products.filter(p => activeFilter === "all" || p.cat === activeFilter);

  return (
    <div>
      <section style={{ padding:"90px 32px 80px", position:"relative", overflow:"hidden", borderBottom:`1px solid rgba(255,255,255,.07)` }}>
        <div style={{ position:"absolute", inset:0 }}><div className="orb1" style={{ position:"absolute", width:560, height:560, borderRadius:"50%", background:"rgba(20,40,224,.18)", filter:"blur(90px)", top:-140, right:-80 }} /><div className="orb2" style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"rgba(212,18,18,.12)", filter:"blur(80px)", bottom:0, left:"5%" }} /></div>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative" }}>
          <Tag>What We Carry</Tag>
          <h1 className="bc" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:900, margin:"14px 0 20px" }}>Our <span style={{ color:C.blue2 }}>Products</span><br/>& Portfolio</h1>
          <p style={{ color:C.gray, maxWidth:520, fontWeight:300, lineHeight:1.8 }}>A carefully curated portfolio of consumer goods, beverages, food products, and specialty brands across the Philippine market.</p>
        </div>
      </section>

      <section style={{ padding:"80px 32px 110px", maxWidth:1160, margin:"0 auto" }}>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:44 }}>
          {filters.map(f=>{
            const active = f===activeFilter;
            return (
              <button key={f} onClick={()=>setActiveFilter(f)} style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"capitalize", padding:"8px 20px", borderRadius:4, border:`1px solid ${active?C.blue:"rgba(255,255,255,.1)"}`, background: active?C.blue:"transparent", color: active?"white":C.gray, cursor:"pointer", transition:"all .25s" }}>
                {f === "all" ? "All Categories" : f}
              </button>
            );
          })}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:22 }}>
          {filtered.map((p,i)=>(
            <Card key={i} style={{ background:C.bg2, overflow:"hidden" }}>
              <div style={{ height:190, background:`linear-gradient(135deg,${C.bg3},#0e0e22)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:60, position:"relative" }}>
                {p.icon}
                {p.badge && <span style={{ position:"absolute", top:12, right:12, background:C.red, color:"#fff", fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 10px", borderRadius:3 }}>{p.badge}</span>}
              </div>
              <div style={{ padding:"24px 24px 16px" }}>
                <div className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.blue2, marginBottom:7 }}>{p.cat}</div>
                <h3 className="bc" style={{ fontSize:"1.3rem", fontWeight:700, marginBottom:8 }}>{p.title}</h3>
                <p style={{ color:C.gray, fontSize:"0.87rem", lineHeight:1.7 }}>{p.desc}</p>
              </div>
              <div style={{ padding:"16px 24px", borderTop:`1px solid rgba(255,255,255,.07)`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", padding:"4px 12px", borderRadius:3, background:"rgba(20,40,224,.1)", color:C.blue2, border:"1px solid rgba(20,40,224,.2)" }}>{p.skus}</span>
                <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:C.blue2, cursor:"pointer" }}>View Details →</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* BRAND */
function PageBrand() {
  const colors = [
    { hex:"#1428E0", rgb:"20, 40, 224", name:"Bridge Blue",  shadow:"rgba(20,40,224,.4)" },
    { hex:"#D41212", rgb:"212, 18, 18",  name:"Bridge Red",   shadow:"rgba(212,18,18,.4)" },
    { hex:"#07070F", rgb:"7, 7, 15",     name:"Deep Black",   border:true },
    { hex:"#E8E8F5", rgb:"232, 232, 245",name:"Off-White",    border:true },
    { hex:"#7878A0", rgb:"120, 120, 160",name:"Muted Gray" },
  ];
  const voiceTraits = [
    { label:"Confident",     desc:"We lead with our strengths and communicate with certainty backed by results." },
    { label:"Trustworthy",   desc:"Straightforward, honest language. No jargon. We say what we mean." },
    { label:"Forward-Moving",desc:"Active verbs, present tense. Bridge is always moving — our language reflects that." },
  ];
  return (
    <div>
      <section style={{ padding:"90px 32px 80px", position:"relative", overflow:"hidden", borderBottom:`1px solid rgba(255,255,255,.07)` }}>
        <div style={{ position:"absolute", inset:0 }}><div className="orb1" style={{ position:"absolute", width:560, height:560, borderRadius:"50%", background:"rgba(20,40,224,.18)", filter:"blur(90px)", top:-140, right:-80 }} /></div>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative" }}>
          <Tag>Identity</Tag>
          <h1 className="bc" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:900, margin:"14px 0 20px" }}>Brand <span style={{ color:C.blue2 }}>Guidelines</span></h1>
          <p style={{ color:C.gray, maxWidth:520, fontWeight:300, lineHeight:1.8 }}>The Bridge Distribution brand is built on trust, strength, and forward momentum. These guidelines ensure our identity is used consistently and with intention.</p>
        </div>
      </section>

      <section style={{ padding:"80px 32px 110px", maxWidth:1160, margin:"0 auto" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>

          {/* Logo */}
          <Card style={{ padding:38 }}>
            <h3 className="bc" style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:24, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:28, height:28, background:"rgba(20,40,224,.15)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🎨</span>
              Logo Usage
            </h3>
            <div style={{ background:"#000", borderRadius:8, padding:36, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20, minHeight:140 }}>
              <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="Logo" style={{ maxHeight:80, width:"auto" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div style={{ padding:18, borderRadius:8, border:"1px solid rgba(74,255,136,.25)", background:"rgba(74,255,136,.04)" }}>
                <div style={{ color:"#4aff88", fontWeight:700, fontSize:"0.88rem", marginBottom:8 }}>✓ Do</div>
                <ul style={{ paddingLeft:16, color:C.gray, fontSize:"0.83rem", lineHeight:1.9 }}><li>Use on dark backgrounds</li><li>Maintain clear space</li><li>Scale proportionally</li></ul>
              </div>
              <div style={{ padding:18, borderRadius:8, border:"1px solid rgba(212,18,18,.25)", background:"rgba(212,18,18,.04)" }}>
                <div style={{ color:C.red2, fontWeight:700, fontSize:"0.88rem", marginBottom:8 }}>✗ Don't</div>
                <ul style={{ paddingLeft:16, color:C.gray, fontSize:"0.83rem", lineHeight:1.9 }}><li>Distort or stretch</li><li>Change brand colors</li><li>Add effects or shadows</li></ul>
              </div>
            </div>
          </Card>

          {/* Colors */}
          <Card style={{ padding:38 }}>
            <h3 className="bc" style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:24, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:28, height:28, background:"rgba(20,40,224,.15)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>🎨</span>
              Color Palette
            </h3>
            {colors.map((col,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:16, marginBottom:16 }}>
                <div style={{ width:46, height:46, borderRadius:8, background:col.hex, boxShadow: col.shadow ? `0 4px 18px ${col.shadow}` : "none", border: col.border ? "1px solid rgba(255,255,255,.15)" : "none", flexShrink:0 }} />
                <div>
                  <div style={{ fontWeight:700, fontSize:"0.95rem" }}>{col.name}</div>
                  <div style={{ fontFamily:"monospace", fontSize:"0.78rem", color:C.gray, marginTop:2, display:"flex", gap:12 }}><span>{col.hex}</span><span>RGB {col.rgb}</span></div>
                </div>
              </div>
            ))}
          </Card>

          {/* Typography */}
          <Card style={{ padding:38 }}>
            <h3 className="bc" style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:24, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:28, height:28, background:"rgba(20,40,224,.15)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>Aa</span>
              Typography
            </h3>
            {[
              { label:"Display / Headings", sample:"Barlow Condensed", style:{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"2.8rem", fontWeight:900, lineHeight:1 }, note:"900 Weight · Display" },
              { label:"Sub-Headings",       sample:"Barlow Condensed", style:{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:"1.8rem", fontWeight:700 }, note:"700 Weight · Sections" },
              { label:"Body / Paragraphs",  sample:"DM Sans — Clean, modern sans-serif for all body copy, captions, and UI labels.", style:{ fontFamily:"'DM Sans',sans-serif", fontSize:"0.93rem", color:C.gray }, note:"300–600 Weight · Body" },
            ].map((t,i)=>(
              <div key={i} style={{ paddingBottom:20, marginBottom:20, borderBottom: i<2 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.gray, marginBottom:6 }}>{t.label}</div>
                <div style={t.style}>{t.sample}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:10, letterSpacing:"0.1em", color:C.blue2, marginTop:4 }}>{t.note}</div>
              </div>
            ))}
          </Card>

          {/* Voice */}
          <Card style={{ padding:38 }}>
            <h3 className="bc" style={{ fontSize:"1.5rem", fontWeight:700, marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ width:28, height:28, background:"rgba(20,40,224,.15)", borderRadius:6, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>💬</span>
              Brand Voice
            </h3>
            <p style={{ color:C.gray, fontSize:"0.9rem", lineHeight:1.8, marginBottom:22 }}>Bridge speaks with clarity and confidence — the voice of an experienced partner, not a faceless corporation. Direct, professional, and warm.</p>
            {voiceTraits.map((v,i)=>(
              <div key={i} style={{ padding:18, background:"rgba(255,255,255,.02)", border:"1px solid rgba(255,255,255,.07)", borderRadius:8, marginBottom:12 }}>
                <div className="bc" style={{ fontSize:12, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.blue2, marginBottom:6 }}>{v.label}</div>
                <p style={{ color:C.gray, fontSize:"0.85rem" }}>{v.desc}</p>
              </div>
            ))}
          </Card>
        </div>
      </section>
    </div>
  );
}

/* CAREERS */
function PageCareers({ nav }) {
  const jobs = [
    { dept:"Sales & Business Development", title:"Key Account Manager",   loc:"Metro Manila",    type:"Full-Time", level:"Experienced" },
    { dept:"Logistics & Operations",        title:"Route Supervisor",      loc:"Multiple Locations",type:"Full-Time", level:"Experienced" },
    { dept:"Finance",                        title:"Financial Analyst",     loc:"Head Office",     type:"Full-Time", level:"Mid-Level" },
    { dept:"Information Technology",         title:"Systems Administrator", loc:"Head Office",     type:"Full-Time", level:"Mid-Level" },
    { dept:"Marketing",                      title:"Brand Activation Officer",loc:"Metro Manila",  type:"Full-Time", level:"Junior–Mid" },
  ];
  const perks = [
    { icon:"💰", title:"Competitive Compensation", desc:"Market-rate salaries with performance bonuses and merit-based increases." },
    { icon:"🏥", title:"Health & Wellness",         desc:"Comprehensive HMO coverage for you and your qualified dependents." },
    { icon:"📚", title:"Learning & Development",    desc:"Training programs, seminars, and professional certification support." },
    { icon:"🌴", title:"Paid Time Off",              desc:"Generous leave credits including vacation, sick leave, and special leaves." },
    { icon:"📈", title:"Career Advancement",         desc:"Clear growth paths with internal promotions prioritized over external hires." },
    { icon:"🎉", title:"Team Events",                desc:"Regular team-building activities, company outings, and year-end celebrations." },
  ];
  return (
    <div>
      <section style={{ padding:"90px 32px 80px", position:"relative", overflow:"hidden", borderBottom:`1px solid rgba(255,255,255,.07)` }}>
        <div style={{ position:"absolute", inset:0 }}><div className="orb1" style={{ position:"absolute", width:560, height:560, borderRadius:"50%", background:"rgba(20,40,224,.18)", filter:"blur(90px)", top:-140, right:-80 }} /><div className="orb2" style={{ position:"absolute", width:380, height:380, borderRadius:"50%", background:"rgba(212,18,18,.12)", filter:"blur(80px)", bottom:0, left:"5%" }} /></div>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative" }}>
          <Tag>Join Our Team</Tag>
          <h1 className="bc" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:900, margin:"14px 0 20px" }}>Build Your<br/><span style={{ color:C.blue2 }}>Career</span> With Us</h1>
          <p style={{ color:C.gray, maxWidth:520, fontWeight:300, lineHeight:1.8, marginBottom:32 }}>Be part of a company that values ambition, rewards excellence, and is on a constant upward trajectory.</p>
          <Btn>See Open Positions <ArrowRight size={15}/></Btn>
        </div>
      </section>

      {/* Culture */}
      <section style={{ background:C.bg2, padding:"90px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>Our Culture</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>A Place Where<br/>People Thrive</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { emoji:"🚀", title:"Growth-Oriented",    desc:"We actively invest in our people through training, mentorship, and career pathing aligned with your ambitions." },
              { emoji:"🤝", title:"Collaborative Spirit",desc:"From warehouse teams to senior management, we operate as one unified force — solving problems and celebrating wins as a family." },
              { emoji:"🌟", title:"Merit-Based",         desc:"Hard work and results are recognized here. We have a culture of accountability and appreciation where contributions truly matter." },
            ].map((c,i)=>(
              <Card key={i} style={{ padding:34, textAlign:"center" }}>
                <div style={{ fontSize:"2.5rem", marginBottom:18 }}>{c.emoji}</div>
                <h3 className="bc" style={{ fontSize:"1.4rem", fontWeight:700, marginBottom:10 }}>{c.title}</h3>
                <p style={{ color:C.gray, fontSize:"0.88rem", lineHeight:1.75 }}>{c.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Perks */}
      <section style={{ padding:"90px 32px", maxWidth:1160, margin:"0 auto" }}>
        <Tag>Benefits</Tag>
        <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>What We Offer</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {perks.map((p,i)=>(
            <div key={i} style={{ display:"flex", gap:16, padding:20, border:"1px solid rgba(255,255,255,.07)", borderRadius:8, alignItems:"flex-start" }}>
              <div style={{ fontSize:"1.3rem", flexShrink:0 }}>{p.icon}</div>
              <div>
                <h5 className="bc" style={{ fontSize:"1rem", fontWeight:700, marginBottom:4 }}>{p.title}</h5>
                <p style={{ color:C.gray, fontSize:"0.83rem" }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Jobs */}
      <section style={{ background:C.bg2, padding:"90px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>Open Positions</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>We're Hiring</h2>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {jobs.map((j,i)=>{
              const [hov,setHov]=useState(false);
              return (
                <div key={i} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                  style={{ background: hov?"rgba(255,255,255,.04)":"rgba(255,255,255,.02)", border:`1px solid ${hov?"rgba(20,40,224,.4)":"rgba(255,255,255,.07)"}`, borderRadius:12, padding:"26px 30px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:20, transition:"all .3s", cursor:"pointer" }}>
                  <div>
                    <div className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:C.red2, marginBottom:5 }}>{j.dept}</div>
                    <h3 className="bc" style={{ fontSize:"1.2rem", fontWeight:700 }}>{j.title}</h3>
                    <div style={{ display:"flex", gap:18, marginTop:8 }}>
                      {[j.loc, j.type, j.level].map((m,k)=>(
                        <span key={k} style={{ fontSize:"0.82rem", color:C.gray, display:"flex", alignItems:"center", gap:5 }}>
                          <span style={{ fontSize:6, color:C.blue2 }}>●</span>{m}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Btn variant="outline" style={{ whiteSpace:"nowrap" }}>Apply Now</Btn>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/* SUPPORT */
function PageSupport() {
  const [openFaq, setOpenFaq] = useState(null);
  const [sent, setSent] = useState(false);
  const faqs = [
    { q:"How do I become a distribution partner with Bridge?", a:"To explore a distribution partnership, email our Business Development team or fill out the contact form below. We'll schedule an initial meeting to discuss your brand, product portfolio, and market objectives." },
    { q:"What product categories does Bridge Distribution handle?", a:"We specialize in FMCG including beverages, food & snacks, personal care, household items, and specialty/import brands — distributed to supermarkets, convenience stores, pharmacies, and independent retailers nationwide." },
    { q:"What is the coverage area of your distribution network?", a:"Bridge Distribution operates nationwide, covering Metro Manila, key cities in Luzon, the Visayas region, and major trade centers in Mindanao." },
    { q:"Do you offer market entry support for international brands?", a:"Yes. We provide comprehensive market entry support including regulatory guidance, trade listing assistance, shelf placement strategies, and consumer activation programs." },
    { q:"How can I track my orders or deliveries?", a:"Existing partners have access to our partner portal with real-time visibility on order status, inventory levels, and delivery tracking. Contact your Account Manager for access credentials." },
  ];
  return (
    <div>
      <section style={{ padding:"90px 32px 80px", position:"relative", overflow:"hidden", borderBottom:`1px solid rgba(255,255,255,.07)` }}>
        <div style={{ position:"absolute", inset:0 }}><div className="orb1" style={{ position:"absolute", width:560, height:560, borderRadius:"50%", background:"rgba(20,40,224,.18)", filter:"blur(90px)", top:-140, right:-80 }} /></div>
        <div style={{ maxWidth:1160, margin:"0 auto", position:"relative" }}>
          <Tag>We're Here to Help</Tag>
          <h1 className="bc" style={{ fontSize:"clamp(3rem,7vw,6rem)", fontWeight:900, margin:"14px 0 20px" }}><span style={{ color:C.blue2 }}>Support</span><br/>& Contact</h1>
          <p style={{ color:C.gray, maxWidth:520, fontWeight:300, lineHeight:1.8 }}>Whether you're an existing partner, a prospective client, or just have a question — our team is always ready to assist.</p>
        </div>
      </section>

      {/* Channels */}
      <section style={{ padding:"90px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>Get In Touch</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>How Can We<br/>Help You?</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { icon:<Phone size={26}/>, title:"Phone Support",   desc:"Speak directly with our customer service team. Available Monday to Saturday, 8AM–6PM.", detail:"+63 (2) 8XXX-XXXX" },
              { icon:<Mail size={26}/>,  title:"Email Us",         desc:"Send us a message and our team will respond within 24–48 business hours.", detail:"info@bridgedistribution.com" },
              { icon:<MapPin size={26}/>,title:"Visit Our Office", desc:"Our head office is open to scheduled visits and meetings. Contact us in advance.", detail:"Metro Manila, Philippines" },
            ].map((ch,i)=>(
              <Card key={i} style={{ padding:34, textAlign:"center" }}>
                <div style={{ width:58, height:58, background:"rgba(20,40,224,.1)", border:"1px solid rgba(20,40,224,.2)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px", color:C.blue2 }}>{ch.icon}</div>
                <h3 className="bc" style={{ fontSize:"1.3rem", fontWeight:700, marginBottom:10 }}>{ch.title}</h3>
                <p style={{ color:C.gray, fontSize:"0.88rem", lineHeight:1.7, marginBottom:18 }}>{ch.desc}</p>
                <div className="bc" style={{ fontSize:13, fontWeight:700, letterSpacing:"0.05em", color:C.blue2 }}>{ch.detail}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background:C.bg2, padding:"90px 32px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>FAQ</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>Frequently Asked<br/>Questions</h2>
          <div style={{ border:"1px solid rgba(255,255,255,.07)", borderRadius:12, overflow:"hidden" }}>
            {faqs.map((faq,i)=>(
              <div key={i} style={{ borderBottom: i<faqs.length-1 ? "1px solid rgba(255,255,255,.07)" : "none" }}>
                <button onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{ width:"100%", textAlign:"left", background: openFaq===i?"rgba(255,255,255,.03)":"transparent", border:"none", padding:"22px 26px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", color:C.white, gap:16 }}>
                  <span className="bc" style={{ fontSize:"1.1rem", fontWeight:700 }}>{faq.q}</span>
                  <div style={{ flexShrink:0, width:22, height:22, borderRadius:"50%", border:"1px solid rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", color:C.blue2, transition:"transform .3s", transform: openFaq===i?"rotate(180deg)":"none" }}>
                    <ChevronDown size={12}/>
                  </div>
                </button>
                {openFaq===i && <div style={{ padding:"0 26px 22px", color:C.gray, fontSize:"0.92rem", lineHeight:1.8 }}>{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section style={{ padding:"90px 32px 110px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <Tag>Contact Us</Tag>
          <h2 className="bc" style={{ fontSize:"clamp(2.4rem,4vw,3.8rem)", fontWeight:800, margin:"14px 0 50px" }}>Send Us<br/>A Message</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:60 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:26 }}>
              {[
                { icon:<MapPin size={18}/>, label:"Head Office",   text:"Bridge Distribution, Inc.\nMetro Manila, Philippines" },
                { icon:<Phone size={18}/>,  label:"Phone",          text:"+63 (2) 8XXX-XXXX\nMon–Sat, 8AM–6PM" },
                { icon:<Mail size={18}/>,   label:"Email",          text:"info@bridgedistribution.com\nhr@bridgedistribution.com" },
              ].map((item,i)=>(
                <div key={i} style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ width:42, height:42, background:"rgba(20,40,224,.1)", border:"1px solid rgba(20,40,224,.2)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:C.blue2 }}>{item.icon}</div>
                  <div>
                    <div className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gray, marginBottom:4 }}>{item.label}</div>
                    <p style={{ color:C.white, fontSize:"0.92rem", whiteSpace:"pre-line" }}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {["First Name","Last Name"].map((lbl,i)=>(
                  <div key={i}><label className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gray, display:"block", marginBottom:7 }}>{lbl}</label>
                  <input style={{ width:"100%", background:C.bg2, border:"1px solid rgba(255,255,255,.09)", borderRadius:6, padding:"11px 14px", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", outline:"none" }} placeholder={i===0?"Juan":"Dela Cruz"}/></div>
                ))}
              </div>
              {[{lbl:"Email Address",ph:"juan@example.com"},{lbl:"Company / Brand",ph:"Your company name"}].map((f,i)=>(
                <div key={i}><label className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gray, display:"block", marginBottom:7 }}>{f.lbl}</label>
                <input style={{ width:"100%", background:C.bg2, border:"1px solid rgba(255,255,255,.09)", borderRadius:6, padding:"11px 14px", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", outline:"none" }} placeholder={f.ph}/></div>
              ))}
              <div>
                <label className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gray, display:"block", marginBottom:7 }}>Inquiry Type</label>
                <select style={{ width:"100%", background:C.bg2, border:"1px solid rgba(255,255,255,.09)", borderRadius:6, padding:"11px 14px", color:C.gray, fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", outline:"none" }}>
                  <option>Select inquiry type...</option>
                  <option>Distribution Partnership</option>
                  <option>Product Listing</option>
                  <option>Market Entry Support</option>
                  <option>General Inquiry</option>
                  <option>Careers</option>
                </select>
              </div>
              <div>
                <label className="bc" style={{ fontSize:11, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:C.gray, display:"block", marginBottom:7 }}>Message</label>
                <textarea style={{ width:"100%", background:C.bg2, border:"1px solid rgba(255,255,255,.09)", borderRadius:6, padding:"11px 14px", color:C.white, fontFamily:"'DM Sans',sans-serif", fontSize:"0.9rem", outline:"none", resize:"vertical", minHeight:110 }} placeholder="Tell us about your brand and what you're looking for..." />
              </div>
              <Btn onClick={()=>{setSent(true);setTimeout(()=>setSent(false),3000);}} style={{ width:"100%", justifyContent:"center", background: sent?"#1a9e60":C.blue }}>
                {sent ? "✓ Message Sent!" : <><Send size={15}/>Send Message</>}
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════ APP ROOT ══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = (id) => { setPage(id); setMobileOpen(false); window.scrollTo({top:0,behavior:"smooth"}); };

  return (
    <>
      <style>{STYLES}</style>

      {/* SCROLL PROGRESS */}
      <div id="__sp" style={{ position:"fixed", top:0, left:0, height:3, background:`linear-gradient(90deg,${C.blue},${C.red})`, zIndex:2001, width:0, transition:"width .1s", pointerEvents:"none" }} />

      {/* NAVBAR */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, height:68, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 36px", background: scrolled ? "rgba(7,7,15,.95)" : "rgba(7,7,15,.7)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,.07)", boxShadow: scrolled?"0 4px 30px rgba(0,0,0,.4)":"none", transition:"all .3s" }}>
        <button onClick={()=>nav("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center" }}>
          <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="Bridge" style={{ height:42, width:"auto" }} />
        </button>
        <div style={{ display:"flex", alignItems:"center", gap:2 }}>
          {NAV.map(n => {
            const active = page === n.id;
            const [hov,setHov]=useState(false);
            return (
              <button key={n.id} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
                onClick={()=>nav(n.id)}
                style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:14, fontWeight:700, letterSpacing:"0.09em", textTransform:"uppercase", color: active||hov ? C.white : "rgba(232,232,245,.55)", background:"none", border:"none", padding:"8px 14px", cursor:"pointer", transition:"color .2s", position:"relative" }}>
                {n.label}
                <span style={{ position:"absolute", bottom:4, left:14, right:14, height:2, background:C.blue2, transform: active?"scaleX(1)":"scaleX(0)", transition:"transform .25s", borderRadius:1 }} />
              </button>
            );
          })}
        </div>
        <Btn onClick={()=>nav("support")} style={{ padding:"10px 22px", fontSize:13 }}><Send size={13}/>Get In Touch</Btn>
      </nav>

      {/* MAIN */}
      <main style={{ paddingTop:68, minHeight:"100vh" }}>
        {page==="home"     && <PageHome nav={nav}/>}
        {page==="about"    && <PageAbout nav={nav}/>}
        {page==="products" && <PageProducts/>}
        {page==="brand"    && <PageBrand/>}
        {page==="careers"  && <PageCareers nav={nav}/>}
        {page==="support"  && <PageSupport/>}
      </main>

      {/* FOOTER */}
      <footer style={{ background:C.bg, borderTop:"1px solid rgba(255,255,255,.07)", padding:"70px 36px 30px" }}>
        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr 1fr", gap:50, paddingBottom:50 }}>
            <div>
              <img src={`data:image/jpeg;base64,${LOGO_B64}`} alt="Bridge Distribution" style={{ height:46, marginBottom:16, width:"auto" }} />
              <p style={{ color:C.gray, fontSize:"0.87rem", lineHeight:1.8, maxWidth:250 }}>Connecting quality brands to the Filipino consumer through world-class distribution, logistics, and trade expertise.</p>
            </div>
            {[
              { head:"Company", links:[["About Us","about"],["Our Brand","brand"],["Careers","careers"],["News & Updates","home"],["CSR & Advocacy","home"]] },
              { head:"Products", links:[["All Products","products"],["Beverages","products"],["Food & Snacks","products"],["Personal Care","products"],["Specialty Brands","products"]] },
              { head:"Support", links:[["Contact Us","support"],["FAQ","support"],["Partner Portal","support"],["Privacy Policy","support"],["Terms of Service","support"]] },
            ].map((col,i)=>(
              <div key={i}>
                <h5 className="bc" style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:C.white, marginBottom:18 }}>{col.head}</h5>
                <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:12 }}>
                  {col.links.map(([label,pg],j)=>(
                    <li key={j}><button onClick={()=>nav(pg)} style={{ background:"none", border:"none", color:C.gray, fontSize:"0.88rem", cursor:"pointer", padding:0, transition:"color .2s" }}
                      onMouseEnter={e=>e.target.style.color=C.white} onMouseLeave={e=>e.target.style.color=C.gray}>{label}</button></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,.07)", paddingTop:26, display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:"0.82rem", color:C.gray }}>
            <span>© 2025 Bridge Distribution, Inc. All rights reserved.</span>
            <span className="bc" style={{ fontWeight:700, letterSpacing:"0.06em" }}>Built with precision. Delivered with purpose.</span>
          </div>
        </div>
      </footer>

      {/* Scroll progress bar logic */}
      <script dangerouslySetInnerHTML={{__html:`
        window.addEventListener('scroll',function(){
          var el=document.getElementById('__sp');
          if(!el)return;
          var p=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100;
          el.style.width=p+'%';
        });
      `}} />
    </>
  );
}
