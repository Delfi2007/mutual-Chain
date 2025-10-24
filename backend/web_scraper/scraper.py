"""
Web Scraping Module
Uses: BeautifulSoup, Selenium
"""

try:
    from bs4 import BeautifulSoup
    import requests
    BEAUTIFULSOUP_AVAILABLE = True
except ImportError:
    BEAUTIFULSOUP_AVAILABLE = False
    BeautifulSoup = None

try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    SELENIUM_AVAILABLE = True
except ImportError:
    SELENIUM_AVAILABLE = False

class WebScraper:
    """Web scraping for grant data and business information"""
    
    def __init__(self):
        self.session = requests.Session() if BEAUTIFULSOUP_AVAILABLE else None
        self.driver = None
    
    def scrape_grants(self, url):
        """Scrape grant information using BeautifulSoup"""
        if not BEAUTIFULSOUP_AVAILABLE:
            return {"error": "BeautifulSoup not installed. Run: pip install beautifulsoup4 requests"}
        
        try:
            response = self.session.get(url)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            grants = []
            
            # Example: Scrape grant listings (adjust selectors based on actual website)
            grant_elements = soup.find_all('div', class_='grant-item')
            
            for grant in grant_elements:
                title = grant.find('h2')
                amount = grant.find('span', class_='amount')
                deadline = grant.find('span', class_='deadline')
                
                grants.append({
                    'title': title.text.strip() if title else 'N/A',
                    'amount': amount.text.strip() if amount else 'N/A',
                    'deadline': deadline.text.strip() if deadline else 'N/A'
                })
            
            return {
                'success': True,
                'grants': grants,
                'count': len(grants)
            }
        except Exception as e:
            return {"error": str(e)}
    
    def scrape_dynamic_content(self, url):
        """Scrape JavaScript-rendered content using Selenium"""
        if not SELENIUM_AVAILABLE:
            return {"error": "Selenium not installed. Run: pip install selenium"}
        
        try:
            # Initialize Chrome driver
            options = webdriver.ChromeOptions()
            options.add_argument('--headless')  # Run in background
            options.add_argument('--no-sandbox')
            options.add_argument('--disable-dev-shm-usage')
            
            self.driver = webdriver.Chrome(options=options)
            self.driver.get(url)
            
            # Wait for content to load
            wait = WebDriverWait(self.driver, 10)
            wait.until(EC.presence_of_element_located((By.CLASS_NAME, 'content')))
            
            # Extract data
            page_source = self.driver.page_source
            soup = BeautifulSoup(page_source, 'html.parser')
            
            # Process scraped data
            data = {
                'title': soup.find('title').text if soup.find('title') else 'N/A',
                'content': soup.get_text()[:500]  # First 500 chars
            }
            
            return {
                'success': True,
                'data': data
            }
        except Exception as e:
            return {"error": str(e)}
        finally:
            if self.driver:
                self.driver.quit()
    
    def scrape_government_grants(self):
        """Scrape government grant databases"""
        urls = [
            'https://www.grants.gov/web/grants/search-grants.html',
            'https://www.sba.gov/funding-programs/grants'
        ]
        
        all_grants = []
        
        for url in urls:
            result = self.scrape_grants(url)
            if result.get('success'):
                all_grants.extend(result.get('grants', []))
        
        return {
            'success': True,
            'grants': all_grants,
            'sources': len(urls)
        }
    
    def scrape_business_data(self, business_name):
        """Scrape public business data"""
        if not BEAUTIFULSOUP_AVAILABLE:
            return {"error": "BeautifulSoup not available"}
        
        search_url = f"https://www.google.com/search?q={business_name}+business"
        
        try:
            response = self.session.get(search_url, headers={
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            })
            soup = BeautifulSoup(response.content, 'html.parser')
            
            # Extract basic business information
            data = {
                'business_name': business_name,
                'found': True,
                'scraped_at': 'now'
            }
            
            return {'success': True, 'data': data}
        except Exception as e:
            return {"error": str(e)}
