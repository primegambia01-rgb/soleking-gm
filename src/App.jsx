import { useState, useEffect, useRef } from "react";

/* ─── FONTS ─── */
const FONT = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap');`;

/* ─── PRODUCTS ─── */
const PRODUCTS = [
  { id:1, name:"Air Force Classic", category:"Sneakers", price:1850, colors:["White","Black","Grey"], sizes:[40,41,42,43,44,45], tag:"Best Seller", emoji:"👟", desc:"Clean all-white silhouette. Goes with everything. A wardrobe essential for every Gambian man." },
  { id:2, name:"Oxford Brogue", category:"Dress Shoes", price:2400, colors:["Brown","Black"], sizes:[40,41,42,43,44,45], tag:"Premium", emoji:"👞", desc:"Sharp wingtip brogues. Perfect for Friday prayers, office, weddings. Commands respect." },
  { id:3, name:"Slip-On Loafer", category:"Loafers", price:1600, colors:["Tan","Navy","Black"], sizes:[40,41,42,43,44], tag:"", emoji:"🥿", desc:"Effortless style. Slide on and walk out. The go-to for casual meetings and everyday comfort." },
  { id:4, name:"Desert Boot", category:"Boots", price:2800, colors:["Sand","Brown","Olive"], sizes:[41,42,43,44,45], tag:"New Arrival", emoji:"🥾", desc:"Rugged suede boots built for the Gambian dust. Style meets function." },
  { id:5, name:"Slide Sandal Pro", category:"Sandals", price:750, colors:["Black","White","Brown"], sizes:[40,41,42,43,44,45], tag:"Budget Pick", emoji:"🩴", desc:"Lightweight EVA sole. Maximum comfort for the heat. Never sacrifice style for comfort." },
  { id:6, name:"Court Runner", category:"Sneakers", price:2200, colors:["Black/White","Grey/Red","All White"], sizes:[40,41,42,43,44,45], tag:"Trending", emoji:"👟", desc:"Low-profile runner with clean lines. From the court to the street — always sharp." },
  { id:7, name:"Monk Strap", category:"Dress Shoes", price:3200, colors:["Cognac","Black"], sizes:[40,41,42,43,44,45], tag:"Premium", emoji:"👞", desc:"Double-buckle monk strap. Reserved for the man who knows what he's doing." },
  { id:8, name:"Cushion Slide", category:"Sandals", price:550, colors:["Black","Navy","Khaki"], sizes:[40,41,42,43,44,45], tag:"Budget Pick", emoji:"🩴", desc:"Thick cushion sole. Easy on your feet all day. Best value in the store." },
];

const CATS = ["All", "Sneakers", "Dress Shoes", "Loafers", "Boots", "Sandals"];
const CITIES = ["Banjul","Serrekunda","Brikama","Bakau","Lamin","Farafenni","Basse","Other"];
const PAYMENTS = ["Wave Money","Orange Money","Cash on Delivery","Afrimoney"];
const ADMIN_PASS = "soleking2025";

/* ─── STYLES ─── */
const CSS = `
${FONT}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --g:#C9A84C;--gl:rgba(201,168,76,0.15);--gd:rgba(201,168,76,0.08);
  --bg:#070707;--s1:#101010;--s2:#161616;--s3:#1e1e1e;
  --tx:#F2EFE8;--mu:#6B6560;--bd:rgba(201,168,76,0.18);
  --red:#e05050;--green:#4CAF7A;
}
body{background:var(--bg);color:var(--tx);font-family:'Outfit',sans-serif;min-height:100vh;overflow-x:hidden;}
body::after{content:'';position:fixed;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:.5;}

/* NAV */
.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 36px;background:rgba(7,7,7,0.94);backdrop-filter:blur(16px);border-bottom:1px solid var(--bd);position:sticky;top:0;z-index:200;gap:16px;}
.nav-logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:700;color:var(--g);letter-spacing:.15em;text-transform:uppercase;cursor:pointer;flex-shrink:0;}
.nav-tabs{display:flex;gap:4px;flex:1;justify-content:center;}
.nav-tab{background:none;border:none;color:var(--mu);font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:.15em;text-transform:uppercase;padding:8px 16px;cursor:pointer;border-radius:2px;transition:all .2s;}
.nav-tab:hover{color:var(--tx);}
.nav-tab.active{color:var(--g);background:var(--gd);}
.nav-right{display:flex;gap:12px;align-items:center;flex-shrink:0;}
.cart-btn{background:var(--g);border:none;color:#000;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;letter-spacing:.15em;padding:10px 20px;cursor:pointer;border-radius:2px;transition:all .2s;position:relative;}
.cart-btn:hover{opacity:.85;}
.cart-badge{position:absolute;top:-6px;right:-6px;background:var(--red);color:#fff;font-size:10px;font-weight:700;border-radius:50%;width:18px;height:18px;display:flex;align-items:center;justify-content:center;}

/* HERO STRIP */
.hero-strip{background:var(--s1);border-bottom:1px solid var(--bd);padding:60px 36px 56px;display:flex;align-items:flex-end;justify-content:space-between;gap:32px;position:relative;overflow:hidden;}
.hero-strip::before{content:'';position:absolute;right:-100px;top:-100px;width:500px;height:500px;background:radial-gradient(circle,rgba(201,168,76,.08) 0%,transparent 65%);pointer-events:none;}
.hero-h{font-family:'Cormorant Garamond',serif;font-size:clamp(42px,7vw,86px);font-weight:700;line-height:.92;letter-spacing:-.02em;}
.hero-h em{color:var(--g);font-style:italic;}
.hero-sub{font-size:14px;color:var(--mu);margin-top:16px;line-height:1.6;max-width:420px;}
.hero-stats{display:flex;gap:40px;flex-shrink:0;}
.stat{text-align:right;}
.stat-num{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:700;color:var(--g);line-height:1;}
.stat-label{font-size:11px;color:var(--mu);letter-spacing:.12em;text-transform:uppercase;margin-top:4px;}

/* FILTER BAR */
.filter-bar{display:flex;gap:8px;padding:24px 36px;border-bottom:1px solid rgba(255,255,255,0.04);overflow-x:auto;flex-wrap:wrap;}
.cat-btn{background:none;border:1px solid rgba(255,255,255,0.08);color:var(--mu);font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:.1em;text-transform:uppercase;padding:8px 20px;cursor:pointer;border-radius:2px;transition:all .2s;white-space:nowrap;}
.cat-btn:hover{color:var(--tx);border-color:rgba(255,255,255,0.2);}
.cat-btn.active{color:var(--g);border-color:var(--g);background:var(--gd);}

/* PRODUCT GRID */
.shop-main{padding:32px 36px 80px;}
.products-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:2px;}
.product-card{background:var(--s1);cursor:pointer;position:relative;overflow:hidden;border:1px solid transparent;transition:border-color .25s;}
.product-card:hover{border-color:var(--bd);}
.product-card:hover .pc-overlay{opacity:1;}
.pc-emoji{font-size:64px;display:flex;align-items:center;justify-content:center;height:180px;background:var(--s2);position:relative;}
.pc-tag{position:absolute;top:12px;left:12px;font-size:10px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:4px 10px;border-radius:2px;}
.pc-tag.best{background:var(--g);color:#000;}
.pc-tag.new{background:#2a5cff;color:#fff;}
.pc-tag.trending{background:#9b59b6;color:#fff;}
.pc-tag.budget{background:var(--green);color:#000;}
.pc-tag.premium{background:linear-gradient(135deg,#C9A84C,#8B6914);color:#000;}
.pc-body{padding:20px;}
.pc-cat{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--mu);margin-bottom:6px;}
.pc-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;margin-bottom:12px;}
.pc-price{font-size:18px;font-weight:600;color:var(--g);}
.pc-price span{font-size:12px;color:var(--mu);margin-left:4px;}
.pc-overlay{position:absolute;inset:0;background:rgba(7,7,7,.6);display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .25s;}
.pc-overlay-btn{background:var(--g);color:#000;border:none;font-family:'Outfit',sans-serif;font-size:12px;font-weight:600;letter-spacing:.15em;text-transform:uppercase;padding:14px 28px;cursor:pointer;border-radius:2px;}

/* MODAL */
.modal-bg{position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:500;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(8px);animation:fadeIn .25s ease;}
.modal{background:var(--s1);border:1px solid var(--bd);width:100%;max-width:680px;max-height:90vh;overflow-y:auto;border-radius:2px;position:relative;animation:slideUp .3s ease;}
.modal-close{position:absolute;top:16px;right:16px;background:var(--s3);border:none;color:var(--mu);font-size:18px;width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;border-radius:2px;z-index:10;}
.modal-close:hover{color:var(--tx);}
.modal-emoji{font-size:80px;display:flex;align-items:center;justify-content:center;height:200px;background:var(--s2);}
.modal-body{padding:32px;}
.modal-cat{font-size:11px;letter-spacing:.25em;text-transform:uppercase;color:var(--g);margin-bottom:8px;}
.modal-name{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;margin-bottom:8px;}
.modal-desc{font-size:14px;color:var(--mu);line-height:1.7;margin-bottom:24px;}
.modal-price{font-size:28px;font-weight:600;color:var(--g);margin-bottom:24px;}
.option-label{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mu);margin-bottom:10px;}
.option-chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;}
.chip{padding:8px 16px;border:1px solid rgba(255,255,255,0.1);background:none;color:var(--tx);font-family:'Outfit',sans-serif;font-size:13px;cursor:pointer;border-radius:2px;transition:all .2s;}
.chip:hover{border-color:var(--g);}
.chip.selected{border-color:var(--g);background:var(--gd);color:var(--g);}
.modal-add-btn{width:100%;padding:18px;background:var(--g);border:none;color:#000;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .2s;margin-top:8px;}
.modal-add-btn:hover{opacity:.9;transform:translateY(-1px);}
.modal-add-btn:disabled{opacity:.4;cursor:not-allowed;transform:none;}

/* CART DRAWER */
.cart-drawer{position:fixed;right:0;top:0;bottom:0;width:420px;background:var(--s1);border-left:1px solid var(--bd);z-index:600;display:flex;flex-direction:column;transform:translateX(100%);transition:transform .3s ease;animation:none;}
.cart-drawer.open{transform:translateX(0);}
.cart-header{padding:24px 28px;border-bottom:1px solid var(--bd);display:flex;justify-content:space-between;align-items:center;}
.cart-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;}
.cart-x{background:none;border:none;color:var(--mu);font-size:22px;cursor:pointer;}
.cart-items{flex:1;overflow-y:auto;padding:20px 28px;display:flex;flex-direction:column;gap:16px;}
.cart-empty{text-align:center;padding:60px 20px;color:var(--mu);}
.cart-item{display:grid;grid-template-columns:56px 1fr auto;gap:14px;padding:16px;background:var(--s2);border-radius:2px;align-items:start;}
.ci-emoji{font-size:30px;display:flex;align-items:center;justify-content:center;height:56px;background:var(--s3);border-radius:2px;}
.ci-name{font-size:14px;font-weight:500;margin-bottom:4px;}
.ci-meta{font-size:12px;color:var(--mu);}
.ci-price{font-size:14px;font-weight:600;color:var(--g);}
.ci-remove{background:none;border:none;color:var(--mu);font-size:18px;cursor:pointer;margin-top:-2px;}
.ci-remove:hover{color:var(--red);}
.cart-footer{padding:24px 28px;border-top:1px solid var(--bd);}
.cart-total-row{display:flex;justify-content:space-between;margin-bottom:20px;font-size:16px;}
.cart-total-amt{font-weight:700;color:var(--g);font-size:20px;}
.cart-checkout-btn{width:100%;padding:16px;background:var(--g);border:none;color:#000;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .2s;}
.cart-checkout-btn:hover{opacity:.9;}

/* CHECKOUT */
.checkout-page{max-width:760px;margin:0 auto;padding:48px 36px 80px;}
.checkout-title{font-family:'Cormorant Garamond',serif;font-size:42px;font-weight:700;margin-bottom:8px;}
.checkout-sub{font-size:14px;color:var(--mu);margin-bottom:40px;}
.checkout-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.form-group{display:flex;flex-direction:column;gap:8px;margin-bottom:4px;}
.form-group.full{grid-column:1/-1;}
.form-group label{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mu);}
.form-group input,.form-group select,.form-group textarea{background:var(--s2);border:1px solid rgba(255,255,255,0.08);border-radius:2px;padding:14px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--tx);outline:none;transition:border-color .2s;}
.form-group input:focus,.form-group select:focus,.form-group textarea:focus{border-color:var(--g);}
.form-group select option{background:var(--s2);}
.payment-options{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:24px;}
.pay-option{background:var(--s2);border:1px solid rgba(255,255,255,0.08);border-radius:2px;padding:16px;cursor:pointer;transition:all .2s;text-align:left;}
.pay-option:hover{border-color:var(--g);}
.pay-option.selected{border-color:var(--g);background:var(--gd);}
.pay-name{font-size:13px;font-weight:500;}
.pay-desc{font-size:11px;color:var(--mu);margin-top:2px;}
.order-summary{background:var(--s2);border:1px solid var(--bd);border-radius:2px;padding:24px;margin-bottom:32px;}
.os-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;margin-bottom:16px;}
.os-item{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;}
.os-item:last-child{border:none;}
.os-total{display:flex;justify-content:space-between;padding-top:16px;margin-top:8px;border-top:1px solid var(--bd);font-size:16px;font-weight:700;}
.os-total span:last-child{color:var(--g);}
.place-btn{width:100%;padding:20px;background:var(--g);border:none;color:#000;font-family:'Outfit',sans-serif;font-size:14px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;border-radius:2px;transition:all .2s;}
.place-btn:hover{opacity:.9;transform:translateY(-1px);}
.place-btn:disabled{opacity:.5;cursor:not-allowed;transform:none;}

/* CONFIRM */
.confirm-page{max-width:560px;margin:0 auto;padding:80px 36px;text-align:center;}
.confirm-icon{width:80px;height:80px;border:2px solid var(--g);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:36px;margin:0 auto 32px;}
.confirm-title{font-family:'Cormorant Garamond',serif;font-size:44px;font-weight:700;margin-bottom:12px;}
.confirm-sub{font-size:15px;color:var(--mu);line-height:1.7;margin-bottom:32px;}
.confirm-ref{background:var(--s2);border:1px solid var(--bd);padding:20px;border-radius:2px;margin-bottom:32px;}
.confirm-ref-label{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--mu);margin-bottom:8px;}
.confirm-ref-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:var(--g);}
.whatsapp-btn{display:inline-flex;align-items:center;gap:10px;background:#25D366;color:#000;border:none;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;letter-spacing:.1em;padding:16px 32px;cursor:pointer;border-radius:2px;margin-bottom:16px;}
.back-btn{background:none;border:1px solid var(--bd);color:var(--mu);font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:.15em;padding:14px 28px;cursor:pointer;border-radius:2px;display:block;width:fit-content;margin:0 auto;}
.back-btn:hover{color:var(--tx);border-color:var(--g);}

/* AI ADVISOR */
.ai-page{max-width:760px;margin:0 auto;padding:48px 36px 80px;}
.ai-header{margin-bottom:40px;}
.ai-title{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:700;margin-bottom:8px;}
.ai-title em{color:var(--g);font-style:italic;}
.ai-sub{font-size:14px;color:var(--mu);line-height:1.6;}
.chat-box{background:var(--s1);border:1px solid var(--bd);border-radius:2px;overflow:hidden;}
.chat-messages{height:420px;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px;}
.msg{max-width:80%;animation:fadeUp .3s ease both;}
.msg.user{align-self:flex-end;}
.msg.ai{align-self:flex-start;}
.msg-bubble{padding:14px 18px;border-radius:2px;font-size:14px;line-height:1.6;}
.msg.user .msg-bubble{background:var(--g);color:#000;font-weight:500;}
.msg.ai .msg-bubble{background:var(--s3);color:var(--tx);border:1px solid rgba(255,255,255,0.06);}
.msg-sender{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--mu);margin-bottom:6px;}
.chat-input-row{display:flex;border-top:1px solid var(--bd);}
.chat-input{flex:1;background:var(--s2);border:none;padding:18px 20px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--tx);outline:none;}
.chat-send{background:var(--g);border:none;color:#000;padding:18px 24px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:700;letter-spacing:.15em;cursor:pointer;transition:opacity .2s;}
.chat-send:hover{opacity:.85;}
.chat-send:disabled{opacity:.4;cursor:not-allowed;}
.ai-typing{display:flex;gap:4px;align-items:center;padding:14px 18px;}
.dot{width:6px;height:6px;background:var(--mu);border-radius:50%;animation:bounce .8s infinite;}
.dot:nth-child(2){animation-delay:.15s;}
.dot:nth-child(3){animation-delay:.3s;}

/* ADMIN */
.admin-login{max-width:400px;margin:80px auto;padding:0 24px;}
.admin-title{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;margin-bottom:8px;}
.admin-sub{font-size:13px;color:var(--mu);margin-bottom:32px;}
.admin-input{width:100%;background:var(--s2);border:1px solid rgba(255,255,255,0.08);border-radius:2px;padding:14px 16px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--tx);outline:none;margin-bottom:16px;}
.admin-input:focus{border-color:var(--g);}
.admin-btn{width:100%;padding:16px;background:var(--g);border:none;color:#000;font-family:'Outfit',sans-serif;font-size:13px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;border-radius:2px;}
.admin-page{padding:36px;}
.admin-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:36px;}
.admin-name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:700;}
.admin-logout{background:none;border:1px solid var(--bd);color:var(--mu);font-family:'Outfit',sans-serif;font-size:12px;padding:8px 16px;cursor:pointer;border-radius:2px;}
.admin-kpis{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:2px;margin-bottom:36px;}
.kpi{background:var(--s1);border:1px solid rgba(255,255,255,0.04);padding:24px;}
.kpi-val{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:700;color:var(--g);}
.kpi-label{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:var(--mu);margin-top:6px;}
.orders-table{background:var(--s1);border:1px solid rgba(255,255,255,0.04);}
.orders-table-header{display:grid;grid-template-columns:1fr 1.5fr 1fr 1fr 1fr 1fr;gap:16px;padding:14px 20px;border-bottom:1px solid var(--bd);font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:var(--mu);}
.order-row{display:grid;grid-template-columns:1fr 1.5fr 1fr 1fr 1fr 1fr;gap:16px;padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:13px;align-items:center;transition:background .2s;}
.order-row:hover{background:var(--gd);}
.order-row:last-child{border:none;}
.status-badge{display:inline-block;font-size:10px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:4px 10px;border-radius:2px;}
.status-badge.pending{background:rgba(201,168,76,.15);color:var(--g);}
.status-badge.confirmed{background:rgba(76,175,122,.15);color:var(--green);}
.status-badge.delivered{background:rgba(42,92,255,.15);color:#6b9fff;}
.status-select{background:var(--s2);border:1px solid rgba(255,255,255,0.08);color:var(--tx);font-family:'Outfit',sans-serif;font-size:11px;padding:5px 8px;border-radius:2px;cursor:pointer;}
.no-orders{text-align:center;padding:60px;color:var(--mu);font-size:14px;}

/* ANIMS */
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyfr
