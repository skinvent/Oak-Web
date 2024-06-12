var downloadLink = ""

async function fetchData() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (id) {
    try {
      const response = await fetch(`https://script.google.com/macros/s/AKfycbzY10nMRy1XdLxIsQzj4MqzLc1MMG4P0UXlG7T0dHYmhE3Ts2c05B6Ghw6yMgb33yeV/exec?id=${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (!data || Object.keys(data).length === 0) {
        throw new Error('No data found');
      }

      document.getElementById('app_title').textContent = data['project_name'];
      document.getElementById('app_developer').textContent = data['project_dev_name'];
      document.getElementById('app_description').textContent = data['project_description'];
      document.getElementById('app_category').textContent = data['category'];
      document.getElementById('app_tags').textContent = data['project_tag'];
      document.getElementById('number_of_downloads').textContent = data['project_download_count'];
      document.getElementById('app_logo').src = data['project_photo'];
      document.getElementById('dev_photo').src = data['project_dev_photo'];
      downloadLink = data['project_download_url'];

      const features = data['project_functions'] ? data['project_functions'].split(','): [];
      const featuresList = document.getElementById('app-features');
      featuresList.innerHTML = '';
      features.forEach(feature => {
        const li = document.createElement('li');
        li.className = 'mdui-list-item mdui-ripple';
        li.textContent = feature.trim();
        featuresList.appendChild(li);
      });

      const screenshots = data['project_screenshots'] ? data['project_screenshots'].split(','): [];
      const screenshotsDiv = document.getElementById('app-screenshots');
      screenshotsDiv.innerHTML = '';
      screenshots.forEach(screenshot => {
        const div = document.createElement('div');
        div.className = 'mdui-col-xs-4';
        const img = document.createElement('img');
        img.src = screenshot.trim();
        img.className = 'mdui-img-fluid';
        div.appendChild(img);
        screenshotsDiv.appendChild(div);
      });
    } catch (error) {
      console.error('Fetch error: ', error);
      document.getElementById('app-detail').innerHTML = `<p>Erro ao carregar os dados: ${error.message}</p>`;
    }
  } else {
    document.getElementById('app-detail').innerHTML = '<p>ID do aplicativo não fornecido na URL.</p>';
  }
}

function openDownloadLink () {
  window.location.href = downloadLink
}

fetchData()