// ============================================================
// Malagana - Tierra del Mango y Cultura
// Lógica de la aplicación (login admin, CRUD, donaciones)
// ============================================================

// ---------- CONFIGURACIÓN ----------
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'malagana2026'; // Demo only
const STORAGE_KEY = 'malagana_data_v1';
const SESSION_KEY = 'malagana_admin_session';

const CATEGORY_EMOJI = {
  'Festival del Mango': '🥭',
  'Paisajes y Sabana': '🌾',
  'Gastronomía': '🍲',
  'Recuerdo / Anécdota': '❤️',
  'Cultura': '🎭',
  'Comunidad': '👥',
};

// ---------- CONTENIDO POR DEFECTO ----------
const DEFAULT_CONTENT = {
  hero_badge: 'Orgullo de la Sabana Bolivarense',
  hero_title: 'Bienvenidos a Malagana',
  hero_subtitle: 'Un pueblo de gente amable, trabajadora y alegre, cuna del tradicional Festival del Mango, tradiciones ancestrales y paisajes inolvidables en el departamento de Bolívar.',
  hero_image_url: 'https://z-cdn-media.chatglm.cn/files/4ddc5809-d5db-43e1-8273-8e268ee1f218.jpg?auth_key=1894328229-cb5fedb7f42e46f0a79f70d7e3f4c123-0-071161975cda2c4a2c279561a2e0f2c5',
  festival_title: 'El Legendario Festival del Mango',
  festival_intro: 'Cada año, Malagana se viste de fiesta para celebrar la abundancia de su fruto insignia. Música de gaita y tambora, sabrosos dulces y una gran alegría comunitaria.',
  festival_card1_title: 'La Ruta del Mango',
  festival_card1_text: 'Recorridos por las históricas fincas y árboles silvestres que dan origen a variedades únicas como el mango de puerco, hilacha y de azúcar.',
  festival_card2_title: 'Feria Gastronómica',
  festival_card2_text: 'Degustación de dulces típicos de mango biche y maduro, arroz con mango, jugos refrescantes y los mejores platos tradicionales de la región.',
  festival_card3_title: 'Folclor y Tambores',
  festival_card3_text: 'Presentaciones de danzas folclóricas, fandangos, decimas y retretas que ponen a bailar a propios y visitantes bajo el sol caribeño.',
  cultura_eyebrow: 'Nuestras Raíces',
  cultura_title: 'Identidad, Calidez y Tradición',
  cultura_body: 'Malagana es mucho más que su festival. Sus calles guardan memorias de faenas agrícolas, sabanas verdes, tardes sabrosas con brisa fresca y una hospitalidad inigualable que caracteriza a nuestra gente bolivarense.',
  cultura_list: 'Gastronomía criolla con sazón de hogar (Sancocho, mote y viandas).\nTradiciones orales, mitos y leyendas locales transmitidas por abuelos.\nUnión familiar y hermandad en cada celebración comunitaria.',
  cultura_box_title: '¿Tienes un negocio o tradición en Malagana?',
  cultura_box_text: 'Este espacio web está pensado para que visibilices tus emprendimientos de dulces, artesanías o eventos especiales del corregimiento.',
  comunidad_title: 'Muro de Historias y Recuerdos',
  comunidad_intro: 'Comparte una foto, un recuerdo del Festival del Mango, una receta o un saludo para nuestra hermosa comunidad.',
};

const DEFAULT_DONATION = {
  enabled: true,
  title: 'Apoya a Malagana',
  message: 'Tu donación nos ayuda a mantener esta página, pagar el alojamiento de fotos y videos, y seguir difundiendo la cultura de nuestro corregimiento. ¡Cualquier aporte es bienvenido!',
  paypal_url: '',
  mercadopago_url: '',
  nequi_number: '',
  daviplata_number: '',
  bancolombia_account: '',
  bancolombia_holder: '',
  show_paypal: true,
  show_mercadopago: true,
  show_nequi: true,
  show_daviplata: true,
  show_bancolombia: true,
};

const FESTIVAL_CARDS = [
  { icon: 'fa-tree', color: 'amber', titleKey: 'festival_card1_title', textKey: 'festival_card1_text' },
  { icon: 'fa-utensils', color: 'emerald', titleKey: 'festival_card2_title', textKey: 'festival_card2_text' },
  { icon: 'fa-music', color: 'amber', titleKey: 'festival_card3_title', textKey: 'festival_card3_text' },
];

const CONTENT_FIELDS = [
  { group: 'Inicio / Hero', key: 'hero_badge', label: 'Etiqueta del Hero', type: 'text' },
  { group: 'Inicio / Hero', key: 'hero_title', label: 'Título principal', type: 'text' },
  { group: 'Inicio / Hero', key: 'hero_subtitle', label: 'Subtítulo del Hero', type: 'textarea' },
  { group: 'Inicio / Hero', key: 'hero_image_url', label: 'URL imagen del logo (mango)', type: 'url' },
  { group: 'Festival del Mango', key: 'festival_title', label: 'Título sección Festival', type: 'text' },
  { group: 'Festival del Mango', key: 'festival_intro', label: 'Introducción del Festival', type: 'textarea' },
  { group: 'Festival del Mango', key: 'festival_card1_title', label: 'Tarjeta 1 - Título', type: 'text' },
  { group: 'Festival del Mango', key: 'festival_card1_text', label: 'Tarjeta 1 - Texto', type: 'textarea' },
  { group: 'Festival del Mango', key: 'festival_card2_title', label: 'Tarjeta 2 - Título', type: 'text' },
  { group: 'Festival del Mango', key: 'festival_card2_text', label: 'Tarjeta 2 - Texto', type: 'textarea' },
  { group: 'Festival del Mango', key: 'festival_card3_title', label: 'Tarjeta 3 - Título', type: 'text' },
  { group: 'Festival del Mango', key: 'festival_card3_text', label: 'Tarjeta 3 - Texto', type: 'textarea' },
  { group: 'Cultura y Sabores', key: 'cultura_eyebrow', label: 'Sobre-entrevista Cultura', type: 'text' },
  { group: 'Cultura y Sabores', key: 'cultura_title', label: 'Título sección Cultura', type: 'text' },
  { group: 'Cultura y Sabores', key: 'cultura_body', label: 'Texto principal Cultura', type: 'textarea' },
  { group: 'Cultura y Sabores', key: 'cultura_list', label: 'Lista de costumbres (una por línea)', type: 'textarea' },
  { group: 'Cultura y Sabores', key: 'cultura_box_title', label: 'Caja lateral - Título', type: 'text' },
  { group: 'Cultura y Sabores', key: 'cultura_box_text', label: 'Caja lateral - Texto', type: 'textarea' },
  { group: 'Muro Comunitario', key: 'comunidad_title', label: 'Título Muro Comunitario', type: 'text' },
  { group: 'Muro Comunitario', key: 'comunidad_intro', label: 'Introducción Muro', type: 'textarea' },
];

const CONTENT_GROUPS = [...new Set(CONTENT_FIELDS.map(f => f.group))];

const DONATION_FIELDS = [
  { key: 'enabled', label: 'Activar botón de donación', type: 'checkbox' },
  { key: 'title', label: 'Título de la sección de donación', type: 'text' },
  { key: 'message', label: 'Mensaje que verán los donantes', type: 'textarea' },
  { key: 'show_paypal', label: 'Mostrar PayPal', type: 'checkbox' },
  { key: 'paypal_url', label: 'PayPal - Enlace de donación (URL completa)', type: 'url', placeholder: 'https://www.paypal.com/donate?hosted_button_id=XXXXX' },
  { key: 'show_mercadopago', label: 'Mostrar MercadoPago', type: 'checkbox' },
  { key: 'mercadopago_url', label: 'MercadoPago - Enlace (URL completa)', type: 'url', placeholder: 'https://link.mercadopago.com/...' },
  { key: 'show_nequi', label: 'Mostrar Nequi', type: 'checkbox' },
  { key: 'nequi_number', label: 'Nequi - Número de teléfono', type: 'text', placeholder: '3001234567' },
  { key: 'show_daviplata', label: 'Mostrar Daviplata', type: 'checkbox' },
  { key: 'daviplata_number', label: 'Daviplata - Número de teléfono', type: 'text', placeholder: '3001234567' },
  { key: 'show_bancolombia', label: 'Mostrar cuenta bancaria', type: 'checkbox' },
  { key: 'bancolombia_account', label: 'Cuenta bancaria - Número', type: 'text', placeholder: '000-123456-78' },
  { key: 'bancolombia_holder', label: 'Cuenta bancaria - Titular', type: 'text', placeholder: 'Nombre del titular' },
];

// ---------- ESTADO ----------
let state = {
  content: { ...DEFAULT_CONTENT },
  donation: { ...DEFAULT_DONATION },
  posts: [],
  gallery: [],
};
let admin = null;
let editingPostId = null;
let editingGalleryId = null;
let pendingImage = null;

// ---------- STORAGE ----------
function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.content = { ...DEFAULT_CONTENT, ...(parsed.content || {}) };
      state.donation = { ...DEFAULT_DONATION, ...(parsed.donation || {}) };
      state.posts = parsed.posts || [];
      state.gallery = parsed.gallery || [];
      return;
    }
  } catch (e) { console.warn('Error leyendo storage:', e); }
  // Seed default
  state.posts = [
    {
      id: 'p1', title: 'María Pérez', author: 'María Pérez',
      content: '¡Qué orgullo tan grande vivir el Festival del Mango en Malagana! Los dulces tradicionales de mango biche quedaron deliciosos este año. ¡Los esperamos a todos en la próxima edición!',
      category: 'Festival del Mango', likes: 14, imageUrl: null, videoUrl: null,
      createdAt: Date.now() - 2 * 3600 * 1000,
    },
    {
      id: 'p2', title: 'Javier Duarte', author: 'Javier Duarte',
      content: 'Hermosos los atardeceres por los caminos de Malagana. Nuestra sabana bolivarense tiene una paz y una belleza única en todo Bolívar.',
      category: 'Paisajes y Sabana', likes: 22, imageUrl: null, videoUrl: null,
      createdAt: Date.now() - 24 * 3600 * 1000,
    },
  ];
  state.gallery = [
    {
      id: 'g1', title: 'Mango de Malagana',
      description: 'El fruto insignia de nuestro corregimiento, fresco y jugoso.',
      imageUrl: DEFAULT_CONTENT.hero_image_url, category: 'Gastronomía',
      createdAt: Date.now() - 3 * 24 * 3600 * 1000,
    },
  ];
  saveData();
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    if (e && (e.name === 'QuotaExceededError' || e.code === 22)) {
      toast('No hay espacio suficiente en el navegador. Las imágenes pesan mucho. Prueba a usar URLs en lugar de subir archivos.', 'error');
    } else {
      console.error('Error guardando:', e);
    }
  }
}

function checkSession() {
  const s = sessionStorage.getItem(SESSION_KEY);
  if (s === '1') {
    admin = { username: ADMIN_USERNAME, name: 'Administrador' };
  }
}

// ---------- AUTH ----------
function handleAdminClick() {
  if (admin) openAdminPanel();
  else openLogin();
}

function openLogin() {
  document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('loginUser').focus();
  document.getElementById('loginError').classList.add('hidden');
}
function closeLogin() {
  document.getElementById('loginModal').classList.add('hidden');
}

function doLogin(e) {
  e.preventDefault();
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPwd').value;
  const err = document.getElementById('loginError');
  if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
    admin = { username: u, name: 'Administrador' };
    sessionStorage.setItem(SESSION_KEY, '1');
    closeLogin();
    document.getElementById('loginPwd').value = '';
    updateAdminUI();
    toast('Bienvenido, ' + admin.name);
    openAdminPanel();
  } else {
    err.textContent = 'Usuario o contraseña incorrectos';
    err.classList.remove('hidden');
  }
}

function doLogout() {
  admin = null;
  sessionStorage.removeItem(SESSION_KEY);
  closeAdminPanel();
  updateAdminUI();
  toast('Sesión cerrada');
}

function updateAdminUI() {
  const icon = document.getElementById('adminBtnIcon');
  const text = document.getElementById('adminBtnText');
  const floatIcon = document.getElementById('floatAdminIcon');
  if (admin) {
    icon.className = 'fa-solid fa-gauge-high';
    text.textContent = 'Admin';
    floatIcon.className = 'fa-solid fa-gauge-high';
  } else {
    icon.className = 'fa-solid fa-lock';
    text.textContent = 'Admin';
    floatIcon.className = 'fa-solid fa-lock';
  }
}

function togglePwd(id, btn) {
  const inp = document.getElementById(id);
  if (inp.type === 'password') { inp.type = 'text'; btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; }
  else { inp.type = 'password'; btn.innerHTML = '<i class="fa-solid fa-eye"></i>'; }
}

// ---------- ADMIN PANEL ----------
function openAdminPanel() {
  if (!admin) return;
  document.getElementById('adminName').textContent = admin.name || admin.username;
  document.getElementById('adminPanel').classList.remove('hidden');
  renderContentEditor();
  renderDonationEditor();
  renderAdminPosts();
  renderAdminGallery();
  switchTab('page');
}
function closeAdminPanel() {
  document.getElementById('adminPanel').classList.add('hidden');
}

function switchTab(name) {
  ['page', 'posts', 'gallery', 'donation'].forEach(t => {
    document.getElementById('tab' + t.charAt(0).toUpperCase() + t.slice(1)).classList.toggle('hidden', t !== name);
  });
  ['Page', 'Posts', 'Gallery', 'Donation'].forEach(t => {
    const btn = document.getElementById('tabBtn' + t);
    if (btn) {
      btn.classList.remove('border-emerald-700', 'text-emerald-900');
      btn.classList.add('border-transparent', 'text-slate-500');
    }
  });
  const activeBtn = document.getElementById('tabBtn' + name.charAt(0).toUpperCase() + name.slice(1));
  if (activeBtn) {
    activeBtn.classList.add('border-emerald-700', 'text-emerald-900');
    activeBtn.classList.remove('border-transparent', 'text-slate-500');
  }
}

// ---------- CONTENT EDITOR ----------
function renderContentEditor() {
  const root = document.getElementById('tabPage');
  root.innerHTML = '<p class="text-xs text-slate-500 mb-3">Edita los textos e imágenes visibles en cada sección del sitio. Cada cambio se guarda individualmente.</p>';
  CONTENT_GROUPS.forEach(group => {
    const section = document.createElement('div');
    section.className = 'space-y-3';
    section.innerHTML = `<h4 class="text-sm font-semibold text-emerald-900 uppercase tracking-wider border-b border-slate-200 pb-1">${group}</h4>`;
    CONTENT_FIELDS.filter(f => f.group === group).forEach(field => {
      const wrap = document.createElement('div');
      wrap.className = 'space-y-1.5 p-3 rounded-lg bg-slate-50 border border-slate-100';
      const val = state.content[field.key] ?? '';
      const inputHtml = field.type === 'textarea'
        ? `<textarea id="cf-${field.key}" rows="3" class="w-full bg-white text-sm px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-emerald-700">${escapeHtml(val)}</textarea>`
        : `<input type="${field.type === 'url' ? 'url' : 'text'}" id="cf-${field.key}" value="${escapeAttr(val)}" class="w-full bg-white text-sm px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-emerald-700">`;
      wrap.innerHTML = `
        <div class="flex items-center justify-between">
          <label class="text-xs font-medium text-slate-700">${field.label}</label>
          <div class="flex gap-1">
            <button onclick="resetField('${field.key}')" title="Restaurar valor por defecto" class="h-6 px-2 text-xs rounded hover:bg-slate-200 text-slate-500"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="saveField('${field.key}')" class="h-6 px-2 text-xs rounded bg-emerald-700 text-white hover:bg-emerald-800"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
          </div>
        </div>
        ${inputHtml}
      `;
      section.appendChild(wrap);
    });
    root.appendChild(section);
  });
}

function saveField(key) {
  const el = document.getElementById('cf-' + key);
  if (!el) return;
  state.content[key] = el.value;
  saveData();
  renderPublic();
  toast('Guardado: ' + (CONTENT_FIELDS.find(f => f.key === key)?.label || key));
}

function resetField(key) {
  const def = DEFAULT_CONTENT[key];
  const el = document.getElementById('cf-' + key);
  if (el) el.value = def;
  toast('Restaurado al valor por defecto (aún no guardado)', 'info');
}

// ---------- DONATION EDITOR (tab "Donación") ----------
function renderDonationEditor() {
  const root = document.getElementById('tabDonation');
  if (!root) return;
  root.innerHTML = '<p class="text-xs text-slate-500 mb-3">Configura los métodos de pago para recibir donaciones que ayuden a mantener la página. Solo completa los que uses; los demás se pueden ocultar.</p>';

  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';

  DONATION_FIELDS.forEach(field => {
    const row = document.createElement('div');
    row.className = 'p-3 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5';
    const val = state.donation[field.key];
    if (field.type === 'checkbox') {
      row.innerHTML = `
        <label class="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
          <input type="checkbox" id="df-${field.key}" ${val ? 'checked' : ''} class="w-4 h-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500" onchange="saveDonationField('${field.key}', this.checked)">
          <span>${field.label}</span>
        </label>
      `;
    } else if (field.type === 'textarea') {
      row.innerHTML = `
        <label class="block text-xs font-medium text-slate-700">${field.label}</label>
        <textarea id="df-${field.key}" rows="3" class="w-full bg-white text-sm px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-emerald-700">${escapeHtml(val || '')}</textarea>
        <button onclick="saveDonationField('${field.key}', document.getElementById('df-${field.key}').value)" class="h-6 px-2 text-xs rounded bg-emerald-700 text-white hover:bg-emerald-800"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
      `;
    } else {
      row.innerHTML = `
        <label class="block text-xs font-medium text-slate-700">${field.label}</label>
        <input type="${field.type === 'url' ? 'url' : 'text'}" id="df-${field.key}" value="${escapeAttr(val || '')}" placeholder="${field.placeholder || ''}" class="w-full bg-white text-sm px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-emerald-700">
        <button onclick="saveDonationField('${field.key}', document.getElementById('df-${field.key}').value)" class="h-6 px-2 text-xs rounded bg-emerald-700 text-white hover:bg-emerald-800"><i class="fa-solid fa-floppy-disk"></i> Guardar</button>
      `;
    }
    wrap.appendChild(row);
  });

  // Botón para guardar todo
  const saveAll = document.createElement('div');
  saveAll.className = 'pt-3 border-t border-slate-200';
  saveAll.innerHTML = `
    <button onclick="saveAllDonation()" class="bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2 rounded inline-flex items-center gap-2">
      <i class="fa-solid fa-floppy-disk"></i> Guardar toda la configuración
    </button>
    <button onclick="resetDonation()" class="ml-2 text-sm font-semibold text-slate-600 border border-slate-200 px-4 py-2 rounded hover:bg-slate-50 inline-flex items-center gap-2">
      <i class="fa-solid fa-rotate-left"></i> Restaurar valores por defecto
    </button>
  `;
  wrap.appendChild(saveAll);

  root.appendChild(wrap);
}

function saveDonationField(key, value) {
  state.donation[key] = value;
  saveData();
  renderPublicDonation();
  toast('Guardado: ' + (DONATION_FIELDS.find(f => f.key === key)?.label || key));
}

function saveAllDonation() {
  DONATION_FIELDS.forEach(field => {
    const el = document.getElementById('df-' + field.key);
    if (!el) return;
    state.donation[field.key] = field.type === 'checkbox' ? el.checked : el.value;
  });
  saveData();
  renderPublicDonation();
  toast('Configuración de donación guardada');
}

function resetDonation() {
  if (!confirm('¿Restaurar los valores por defecto de la configuración de donación?')) return;
  state.donation = { ...DEFAULT_DONATION };
  saveData();
  renderDonationEditor();
  renderPublicDonation();
  toast('Configuración restaurada');
}

// ---------- POSTS ----------
function renderAdminPosts() {
  const list = document.getElementById('adminPostsList');
  document.getElementById('postsCountLabel').textContent =
    state.posts.length + ' publicación' + (state.posts.length !== 1 ? 'es' : '') + ' • con imagen y video';
  list.innerHTML = '';
  if (state.posts.length === 0) {
    list.innerHTML = '<p class="text-center text-slate-400 text-sm py-8">No hay publicaciones. Crea la primera.</p>';
    return;
  }
  state.posts.forEach(p => {
    const div = document.createElement('div');
    div.className = 'border border-slate-200 rounded-lg p-3 hover:border-emerald-300 bg-white';
    const badges = [];
    if (p.videoUrl) badges.push('<span class="text-xs text-red-600"><i class="fa-solid fa-video"></i> video</span>');
    if (p.imageUrl) badges.push('<span class="text-xs text-blue-600"><i class="fa-solid fa-image"></i> foto</span>');
    div.innerHTML = `
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1.5 mb-0.5">
            <span class="text-xs">${CATEGORY_EMOJI[p.category] || '📝'}</span>
            <span class="text-xs text-slate-500">${escapeHtml(p.category)}</span>
            ${badges.join('')}
          </div>
          <h4 class="font-semibold text-sm text-slate-800 truncate">${escapeHtml(p.author || p.title)}</h4>
          <p class="text-xs text-slate-500 line-clamp-2 mt-0.5">${escapeHtml(p.content)}</p>
          <p class="text-[10px] text-slate-400 mt-1">${escapeHtml(p.author)} • ${timeAgo(p.createdAt)} • ${p.likes} me gusta</p>
        </div>
        <button onclick="openPostEditor('${p.id}')" class="h-7 w-7 flex items-center justify-center text-slate-500 hover:text-emerald-700"><i class="fa-solid fa-pen"></i></button>
      </div>
    `;
    list.appendChild(div);
  });
}

function openPostEditor(id) {
  editingPostId = id || null;
  pendingImage = null;
  const p = id ? state.posts.find(x => x.id === id) : null;
  document.getElementById('postEditorTitle').textContent = p ? 'Editar publicación' : 'Nueva publicación';
  document.getElementById('peTitle').value = p ? p.title : '';
  document.getElementById('peAuthor').value = p ? p.author : 'Comunidad Malagana';
  document.getElementById('peCategory').value = p ? p.category : 'Festival del Mango';
  document.getElementById('peContent').value = p ? p.content : '';
  document.getElementById('peVideoUrl').value = p ? (p.videoUrl || '') : '';
  document.getElementById('peDeleteBtn').classList.toggle('hidden', !p);
  renderImageUploader('peImageUploader', p ? p.imageUrl : null, 'post');
  document.getElementById('postEditorModal').classList.remove('hidden');
}

function closePostEditor() {
  document.getElementById('postEditorModal').classList.add('hidden');
  editingPostId = null;
  pendingImage = null;
}

function savePost() {
  const title = document.getElementById('peTitle').value.trim();
  const content = document.getElementById('peContent').value.trim();
  if (!title || !content) {
    toast('Título y contenido son obligatorios', 'error');
    return;
  }
  const author = document.getElementById('peAuthor').value.trim() || 'Comunidad Malagana';
  const category = document.getElementById('peCategory').value;
  const videoUrl = document.getElementById('peVideoUrl').value.trim() || null;
  const imageUrl = pendingImage ? pendingImage.dataUrl : (document.getElementById('peImageUploader-previewsrc')?.value || null);

  if (editingPostId) {
    const p = state.posts.find(x => x.id === editingPostId);
    if (p) {
      p.title = title; p.author = author; p.category = category;
      p.content = content; p.videoUrl = videoUrl;
      if (pendingImage) p.imageUrl = pendingImage.dataUrl;
    }
    toast('Publicación actualizada');
  } else {
    state.posts.unshift({
      id: 'p' + Date.now() + Math.random().toString(36).slice(2, 6),
      title, author, category, content, videoUrl,
      imageUrl: pendingImage ? pendingImage.dataUrl : null,
      likes: 0, createdAt: Date.now(),
    });
    toast('Publicación creada');
  }
  saveData();
  renderAdminPosts();
  renderPublicPosts();
  closePostEditor();
}

function deleteCurrentPost() {
  if (!editingPostId) return;
  if (!confirm('¿Eliminar esta publicación? Esta acción no se puede deshacer.')) return;
  state.posts = state.posts.filter(p => p.id !== editingPostId);
  saveData();
  renderAdminPosts();
  renderPublicPosts();
  closePostEditor();
  toast('Publicación eliminada');
}

function submitPublicPost(e) {
  e.preventDefault();
  const name = document.getElementById('pubName').value.trim();
  const category = document.getElementById('pubCategory').value;
  const content = document.getElementById('pubContent').value.trim();
  if (!name || !content) { toast('Tu nombre y mensaje son obligatorios', 'error'); return; }
  state.posts.unshift({
    id: 'p' + Date.now() + Math.random().toString(36).slice(2, 6),
    title: name, author: name, category, content,
    imageUrl: null, videoUrl: null, likes: 0, createdAt: Date.now(),
  });
  saveData();
  renderPublicPosts();
  document.getElementById('postForm').reset();
  toast('¡Publicación añadida al muro!');
}

// ---------- GALLERY ----------
function renderAdminGallery() {
  const list = document.getElementById('adminGalleryList');
  document.getElementById('galleryCountLabel').textContent =
    state.gallery.length + ' imagen' + (state.gallery.length !== 1 ? 'es' : '') + ' en la galería';
  list.innerHTML = '';
  if (state.gallery.length === 0) {
    list.innerHTML = '<p class="col-span-full text-center text-slate-400 text-sm py-8">No hay imágenes. Sube la primera.</p>';
    return;
  }
  state.gallery.forEach(g => {
    const btn = document.createElement('button');
    btn.className = 'group relative rounded-lg overflow-hidden border border-slate-200 hover:border-emerald-300 bg-white text-left';
    btn.onclick = () => openGalleryEditor(g.id);
    btn.innerHTML = `
      <img src="${escapeAttr(g.imageUrl)}" alt="${escapeAttr(g.title)}" class="w-full h-24 object-cover">
      <div class="p-2">
        <p class="text-xs font-semibold text-slate-800 truncate">${escapeHtml(g.title)}</p>
        <p class="text-[10px] text-slate-500">${escapeHtml(g.category)}</p>
      </div>
      <div class="absolute top-1 right-1 bg-emerald-900 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"><i class="fa-solid fa-pen text-[10px]"></i></div>
    `;
    list.appendChild(btn);
  });
}

function openGalleryEditor(id) {
  editingGalleryId = id || null;
  pendingImage = null;
  const g = id ? state.gallery.find(x => x.id === id) : null;
  document.getElementById('geTitle').textContent = g ? 'Editar imagen' : 'Nueva imagen de galería';
  document.getElementById('geImgTitle').value = g ? g.title : '';
  document.getElementById('geCategory').value = g ? g.category : 'Paisajes y Sabana';
  document.getElementById('geDescription').value = g ? (g.description || '') : '';
  document.getElementById('geDeleteBtn').classList.toggle('hidden', !g);
  renderImageUploader('geImageUploader', g ? g.imageUrl : null, 'gallery');
  document.getElementById('galleryEditorModal').classList.remove('hidden');
}

function closeGalleryEditor() {
  document.getElementById('galleryEditorModal').classList.add('hidden');
  editingGalleryId = null;
  pendingImage = null;
}

function saveGallery() {
  const title = document.getElementById('geImgTitle').value.trim();
  if (!title) { toast('El título es obligatorio', 'error'); return; }
  const category = document.getElementById('geCategory').value;
  const description = document.getElementById('geDescription').value.trim() || null;
  const previewSrc = document.getElementById('geImageUploader-previewsrc')?.value;
  const imageUrl = pendingImage ? pendingImage.dataUrl : previewSrc;
  if (!imageUrl) { toast('La imagen es obligatoria', 'error'); return; }

  if (editingGalleryId) {
    const g = state.gallery.find(x => x.id === editingGalleryId);
    if (g) {
      g.title = title; g.category = category; g.description = description;
      if (pendingImage) g.imageUrl = pendingImage.dataUrl;
    }
    toast('Imagen actualizada');
  } else {
    state.gallery.unshift({
      id: 'g' + Date.now() + Math.random().toString(36).slice(2, 6),
      title, category, description, imageUrl, createdAt: Date.now(),
    });
    toast('Imagen añadida a la galería');
  }
  saveData();
  renderAdminGallery();
  renderPublicGallery();
  closeGalleryEditor();
}

function deleteCurrentGallery() {
  if (!editingGalleryId) return;
  if (!confirm('¿Eliminar esta imagen de la galería?')) return;
  state.gallery = state.gallery.filter(g => g.id !== editingGalleryId);
  saveData();
  renderAdminGallery();
  renderPublicGallery();
  closeGalleryEditor();
  toast('Imagen eliminada');
}

// ---------- IMAGE UPLOADER ----------
function renderImageUploader(containerId, currentUrl, target) {
  const el = document.getElementById(containerId);
  el.innerHTML = `
    <label class="block text-xs font-semibold text-slate-600 mb-1">${target === 'post' ? 'Imagen del post' : 'Imagen *'}</label>
    <div class="flex gap-2 mb-2" id="${containerId}-tabs">
      <button type="button" onclick="setUploadMode('${containerId}','upload','${target}')" class="text-xs px-2 py-1 rounded border ${currentUrl ? 'border-slate-300 text-slate-600' : 'border-emerald-700 bg-emerald-700 text-white'}"><i class="fa-solid fa-upload"></i> Subir archivo</button>
      <button type="button" onclick="setUploadMode('${containerId}','url','${target}')" class="text-xs px-2 py-1 rounded border ${currentUrl ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 text-slate-600'}"><i class="fa-solid fa-link"></i> Pegar URL</button>
    </div>
    <div id="${containerId}-upload" class="${currentUrl ? 'hidden' : ''}">
      <button type="button" onclick="triggerFileInput('${containerId}','${target}')" class="w-full border-dashed border-2 border-slate-300 text-slate-600 text-sm py-3 rounded hover:border-emerald-500 hover:text-emerald-700">
        <i class="fa-solid fa-image"></i> Seleccionar imagen (máx ~3MB)
      </button>
      <p class="text-[10px] text-slate-400 mt-1">Las imágenes se guardan en el navegador como base64. Para imágenes grandes, mejor usa URL.</p>
    </div>
    <div id="${containerId}-url" class="${currentUrl ? '' : 'hidden'}">
      <input type="url" id="${containerId}-urlinput" value="${currentUrl ? escapeAttr(currentUrl) : ''}" placeholder="https://..." class="w-full text-sm px-2 py-1.5 border border-slate-200 rounded focus:outline-none focus:border-emerald-700" oninput="syncPreviewUrl('${containerId}')">
    </div>
    <input type="hidden" id="${containerId}-previewsrc" value="${currentUrl ? escapeAttr(currentUrl) : ''}">
    <div id="${containerId}-preview" class="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-slate-200 bg-slate-50 ${currentUrl ? '' : 'hidden'}">
      <img id="${containerId}-img" src="${currentUrl ? escapeAttr(currentUrl) : ''}" alt="Vista previa" class="w-full h-full object-cover">
      <button type="button" onclick="clearImage('${containerId}','${target}')" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600">×</button>
    </div>
  `;
  pendingImage = null;
}

function setUploadMode(containerId, mode, target) {
  const uploadBox = document.getElementById(containerId + '-upload');
  const urlBox = document.getElementById(containerId + '-url');
  const tabs = document.getElementById(containerId + '-tabs');
  uploadBox.classList.toggle('hidden', mode !== 'upload');
  urlBox.classList.toggle('hidden', mode !== 'url');
  const btns = tabs.querySelectorAll('button');
  btns[0].className = 'text-xs px-2 py-1 rounded border ' + (mode === 'upload' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 text-slate-600');
  btns[1].className = 'text-xs px-2 py-1 rounded border ' + (mode === 'url' ? 'border-emerald-700 bg-emerald-700 text-white' : 'border-slate-300 text-slate-600');
}

function triggerFileInput(containerId, target) {
  const input = document.getElementById('hiddenFileInput');
  input.value = '';
  input.onchange = () => {
    const f = input.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) { toast('Solo se permiten imágenes', 'error'); return; }
    if (f.size > 3 * 1024 * 1024) {
      toast('La imagen pesa más de 3MB. Usa una URL para evitar llenar el almacenamiento del navegador.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      pendingImage = { dataUrl: reader.result, target };
      showPreview(containerId, reader.result);
      toast('Imagen cargada');
    };
    reader.readAsDataURL(f);
  };
  input.click();
}

function syncPreviewUrl(containerId) {
  const url = document.getElementById(containerId + '-urlinput').value;
  document.getElementById(containerId + '-previewsrc').value = url;
  showPreview(containerId, url);
  pendingImage = null;
}

function showPreview(containerId, url) {
  const prev = document.getElementById(containerId + '-preview');
  const img = document.getElementById(containerId + '-img');
  if (url) {
    img.src = url;
    prev.classList.remove('hidden');
  } else {
    prev.classList.add('hidden');
  }
}

function clearImage(containerId, target) {
  pendingImage = null;
  const urlInput = document.getElementById(containerId + '-urlinput');
  if (urlInput) urlInput.value = '';
  document.getElementById(containerId + '-previewsrc').value = '';
  document.getElementById(containerId + '-preview').classList.add('hidden');
}

// ---------- DONATION MODAL ----------
function openDonationModal() {
  const d = state.donation;
  if (!d.enabled) {
    toast('Las donaciones están desactivadas. Actívalas desde el panel admin.', 'info');
    return;
  }
  const modal = document.getElementById('donationModal');
  const title = document.getElementById('donModalTitle');
  const msg = document.getElementById('donModalMessage');
  const list = document.getElementById('donModalMethods');
  title.textContent = d.title || 'Apoya a Malagana';
  msg.textContent = d.message || '';
  list.innerHTML = '';

  const methods = [];
  if (d.show_paypal && d.paypal_url) {
    methods.push({
      name: 'PayPal',
      detail: 'Paga con tu cuenta PayPal o tarjeta',
      icon: 'fab fa-paypal',
      color: '#003087',
      bg: '#e0e7ff',
      href: d.paypal_url,
      external: true,
    });
  }
  if (d.show_mercadopago && d.mercadopago_url) {
    methods.push({
      name: 'MercadoPago',
      detail: 'Paga con PSE, tarjeta o saldo',
      icon: 'fas fa-hand-holding-dollar',
      color: '#009ee3',
      bg: '#e0f2fe',
      href: d.mercadopago_url,
      external: true,
    });
  }
  if (d.show_nequi && d.nequi_number) {
    methods.push({
      name: 'Nequi',
      detail: d.nequi_number,
      icon: 'fas fa-mobile-screen',
      color: '#7a2d86',
      bg: '#fce7f3',
      copyText: d.nequi_number,
    });
  }
  if (d.show_daviplata && d.daviplata_number) {
    methods.push({
      name: 'Daviplata',
      detail: d.daviplata_number,
      icon: 'fas fa-money-bill-wave',
      color: '#d61f26',
      bg: '#fee2e2',
      copyText: d.daviplata_number,
    });
  }
  if (d.show_bancolombia && d.bancolombia_account) {
    methods.push({
      name: 'Cuenta Bancolombia',
      detail: (d.bancolombia_holder ? d.bancolombia_holder + ' • ' : '') + d.bancolombia_account,
      icon: 'fas fa-building-columns',
      color: '#1a936f',
      bg: '#d1fae5',
      copyText: d.bancolombia_account,
    });
  }

  if (methods.length === 0) {
    list.innerHTML = '<p class="text-center text-slate-400 text-sm py-6">El administrador aún no ha configurado métodos de pago. Vuelve pronto.</p>';
  } else {
    methods.forEach(m => {
      const el = document.createElement('a');
      el.className = 'pay-method';
      if (m.href) {
        el.href = m.href;
        el.target = '_blank';
        el.rel = 'noopener noreferrer';
      } else {
        el.href = '#';
        el.onclick = (ev) => { ev.preventDefault(); copyToClipboard(m.copyText, m.name); };
      }
      el.innerHTML = `
        <div class="pay-method-icon" style="background:${m.bg};color:${m.color}"><i class="${m.icon}"></i></div>
        <div class="pay-method-body">
          <div class="pay-method-name">${escapeHtml(m.name)}</div>
          <div class="pay-method-detail">${escapeHtml(m.detail)}</div>
        </div>
        ${m.href
          ? '<div class="pay-method-copy" style="background:#dbeafe;color:#1e40af"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ir</div>'
          : '<div class="pay-method-copy"><i class="fa-solid fa-copy"></i> Copiar</div>'}
      `;
      list.appendChild(el);
    });
  }

  modal.classList.remove('hidden');
}

function closeDonationModal() {
  document.getElementById('donationModal').classList.add('hidden');
}

function copyToClipboard(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      toast(label + ' copiado: ' + text);
    }).catch(() => fallbackCopy(text, label));
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    toast(label + ' copiado: ' + text);
  } catch (e) {
    toast('No se pudo copiar automáticamente. Anota: ' + text, 'error');
  }
  document.body.removeChild(ta);
}

// ---------- RENDER PÚBLICO ----------
function renderPublic() {
  const c = state.content;
  document.getElementById('heroBadge').textContent = c.hero_badge;
  const titleWords = (c.hero_title || '').split(' ');
  if (titleWords.length > 1) {
    document.getElementById('heroTitle').innerHTML =
      escapeHtml(titleWords.slice(0, -1).join(' ')) +
      ' <span class="text-amber-400">' + escapeHtml(titleWords.slice(-1)[0]) + '</span>';
  } else {
    document.getElementById('heroTitle').innerHTML = '<span class="text-amber-400">' + escapeHtml(c.hero_title) + '</span>';
  }
  document.getElementById('heroSubtitle').textContent = c.hero_subtitle;
  if (c.hero_image_url) {
    document.getElementById('navLogo').src = c.hero_image_url;
    document.getElementById('footerLogo').src = c.hero_image_url;
  }
  document.getElementById('festivalTitle').textContent = c.festival_title;
  document.getElementById('festivalIntro').textContent = c.festival_intro;

  const cardsRoot = document.getElementById('festivalCards');
  cardsRoot.innerHTML = '';
  FESTIVAL_CARDS.forEach(card => {
    const div = document.createElement('div');
    div.className = 'bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition';
    const colorCls = card.color === 'amber' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-700';
    div.innerHTML = `
      <div class="w-14 h-14 ${colorCls} rounded-xl flex items-center justify-center text-2xl mb-6">
        <i class="fa-solid ${card.icon}"></i>
      </div>
      <h3 class="text-xl font-bold text-slate-800 mb-3">${escapeHtml(c[card.titleKey])}</h3>
      <p class="text-slate-600 text-sm leading-relaxed">${escapeHtml(c[card.textKey])}</p>
    `;
    cardsRoot.appendChild(div);
  });

  document.getElementById('culturaEyebrow').textContent = c.cultura_eyebrow;
  document.getElementById('culturaTitle').textContent = c.cultura_title;
  document.getElementById('culturaBody').textContent = c.cultura_body;
  const list = document.getElementById('culturaList');
  list.innerHTML = '';
  (c.cultura_list || '').split('\n').filter(Boolean).forEach(item => {
    const li = document.createElement('li');
    li.className = 'flex items-start space-x-3';
    li.innerHTML = '<i class="fa-solid fa-circle-check text-amber-400 flex-shrink-0 mt-1"></i><span>' + escapeHtml(item) + '</span>';
    list.appendChild(li);
  });
  document.getElementById('culturaBoxTitle').textContent = c.cultura_box_title;
  document.getElementById('culturaBoxText').textContent = c.cultura_box_text;
  document.getElementById('comunidadTitle').textContent = c.comunidad_title;
  document.getElementById('comunidadIntro').textContent = c.comunidad_intro;

  renderPublicPosts();
  renderPublicGallery();
  renderPublicDonation();
}

function renderPublicPosts() {
  const root = document.getElementById('postsContainer');
  root.innerHTML = '';
  if (state.posts.length === 0) {
    root.innerHTML = '<div class="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-400">Aún no hay publicaciones en el muro. ¡Sé el primero en compartir!</div>';
    return;
  }
  state.posts.forEach(p => {
    const article = document.createElement('article');
    article.className = 'bg-white p-6 rounded-2xl shadow-sm border border-slate-100';
    const initials = (p.author || p.title).split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const imgHtml = p.imageUrl ? `<div class="mt-3 rounded-xl overflow-hidden border border-slate-100"><img src="${escapeAttr(p.imageUrl)}" alt="${escapeAttr(p.title)}" class="w-full max-h-80 object-cover"></div>` : '';
    const videoHtml = p.videoUrl ? `<div class="mt-3 rounded-xl overflow-hidden border border-slate-100 aspect-video">${embedVideo(p.videoUrl)}</div>` : '';
    article.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center font-bold text-sm">${initials}</div>
          <div>
            <h4 class="font-bold text-sm text-slate-800">${escapeHtml(p.author || p.title)}</h4>
            <span class="text-xs text-slate-400">${escapeHtml(p.category)} • ${timeAgo(p.createdAt)}</span>
          </div>
        </div>
        <span class="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-1 rounded-full">${CATEGORY_EMOJI[p.category] || '📝'} ${escapeHtml(p.category)}</span>
      </div>
      <p class="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">${escapeHtml(p.content)}</p>
      ${imgHtml}
      ${videoHtml}
      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <button onclick="likePost('${p.id}')" class="flex items-center space-x-1 hover:text-emerald-700 transition">
          <i class="fa-solid fa-heart text-red-500"></i>
          <span>Me gusta (<span id="likes-${p.id}">${p.likes}</span>)</span>
        </button>
        <span>Comunidad Malagana</span>
      </div>
    `;
    root.appendChild(article);
  });
}

function renderPublicGallery() {
  const root = document.getElementById('galleryGrid');
  root.innerHTML = '';
  if (state.gallery.length === 0) {
    root.innerHTML = '<p class="col-span-full text-center text-slate-400 py-12">Aún no hay imágenes en la galería.</p>';
    return;
  }
  state.gallery.forEach(g => {
    const figure = document.createElement('figure');
    figure.className = 'group relative rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-md transition';
    figure.innerHTML = `
      <div class="aspect-square overflow-hidden bg-slate-100">
        <img src="${escapeAttr(g.imageUrl)}" alt="${escapeAttr(g.title)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
      </div>
      <figcaption class="p-3">
        <h4 class="text-sm font-semibold text-slate-800 truncate">${escapeHtml(g.title)}</h4>
        ${g.description ? '<p class="text-xs text-slate-500 line-clamp-2 mt-0.5">' + escapeHtml(g.description) + '</p>' : ''}
        <span class="inline-block mt-2 text-[10px] bg-slate-100 px-2 py-0.5 rounded">${CATEGORY_EMOJI[g.category] || '🖼️'} ${escapeHtml(g.category)}</span>
      </figcaption>
    `;
    root.appendChild(figure);
  });
}

function renderPublicDonation() {
  const d = state.donation;
  const navBtn = document.getElementById('navDonateBtn');
  const section = document.getElementById('donacion');
  const floatBtn = document.getElementById('floatDonateBtn');
  const footerLink = document.getElementById('footerDonateLink');

  // Show whenever donation is enabled (the modal handles the "no methods yet" case)
  const visible = d.enabled;
  [navBtn, section, floatBtn, footerLink].forEach(el => {
    if (el) el.classList.toggle('hidden', !visible);
  });
  // Sync the section title/message with the admin-edited values
  const sectionTitle = document.getElementById('donSectionTitle');
  const sectionMessage = document.getElementById('donSectionMessage');
  if (sectionTitle) sectionTitle.textContent = d.title || 'Apoya a Malagana';
  if (sectionMessage) sectionMessage.textContent = d.message || '';
}

function hasAnyDonationMethod(d) {
  return (d.show_paypal && d.paypal_url) ||
         (d.show_mercadopago && d.mercadopago_url) ||
         (d.show_nequi && d.nequi_number) ||
         (d.show_daviplata && d.daviplata_number) ||
         (d.show_bancolombia && d.bancolombia_account);
}

function likePost(id) {
  const p = state.posts.find(x => x.id === id);
  if (!p) return;
  p.likes++;
  saveData();
  const span = document.getElementById('likes-' + id);
  if (span) span.textContent = p.likes;
}

// ---------- VIDEO EMBED ----------
function embedVideo(url) {
  if (!url) return '';
  try {
    const u = new URL(url);
    let embed = null;
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) embed = `https://www.youtube.com/embed/${v}`;
      else if (u.pathname.startsWith('/embed/')) embed = url;
    } else if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.slice(1);
      if (id) embed = `https://www.youtube.com/embed/${id}`;
    } else if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').pop();
      if (id) embed = `https://player.vimeo.com/video/${id}`;
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      return `<video src="${escapeAttr(url)}" controls class="w-full h-full"></video>`;
    }
    if (embed) {
      return `<iframe src="${escapeAttr(embed)}" title="Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full h-full" frameborder="0"></iframe>`;
    }
    return '';
  } catch { return ''; }
}

// ---------- EXPORT / IMPORT ----------
function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `malagana-respaldo-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  toast('Respaldo descargado');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.onchange = () => {
    const f = input.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (!parsed.content || !Array.isArray(parsed.posts) || !Array.isArray(parsed.gallery)) {
          throw new Error('Formato inválido');
        }
        if (!confirm('Esto reemplazará todo el contenido actual. ¿Continuar?')) return;
        state = {
          content: { ...DEFAULT_CONTENT, ...parsed.content },
          donation: { ...DEFAULT_DONATION, ...(parsed.donation || {}) },
          posts: parsed.posts,
          gallery: parsed.gallery,
        };
        saveData();
        renderPublic();
        renderContentEditor();
        renderDonationEditor();
        renderAdminPosts();
        renderAdminGallery();
        toast('Datos importados correctamente');
      } catch (e) {
        toast('Archivo inválido: ' + e.message, 'error');
      }
    };
    reader.readAsText(f);
  };
  input.click();
}

// ---------- UTILS ----------
function timeAgo(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'Justo ahora';
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `Hace ${days} d`;
  return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short' });
}

function escapeHtml(s) {
  if (s == null) return '';
  return String(s).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}
function escapeAttr(s) { return escapeHtml(s); }

function toast(msg, type = 'success') {
  const colors = {
    success: 'bg-emerald-600',
    error: 'bg-red-600',
    info: 'bg-slate-700',
  };
  const t = document.createElement('div');
  t.className = `${colors[type] || colors.success} text-white text-sm px-4 py-2.5 rounded-lg shadow-lg animate-fade-in`;
  t.textContent = msg;
  document.getElementById('toastContainer').appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transition = 'opacity 0.3s'; }, 2500);
  setTimeout(() => t.remove(), 2900);
}

// ---------- INIT ----------
(function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  loadData();
  checkSession();
  updateAdminUI();
  renderPublic();
})();
