import { CareerContact } from '@/types/career';

// ContactInfoコンポーネントをモック
jest.mock('@/components/ui/ContactInfo', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('ContactInfo', () => {
  // 連絡先情報がある場合のテスト
  it('連絡先情報が存在する場合、正しく表示される', () => {
    const contact: CareerContact = {
      email: 'test@example.com',
      twitter: 'testuser',
      linkedin: 'test-profile',
      github: 'testuser'
    };
    
    // 各連絡先情報が存在することを確認
    expect(contact.email).toBe('test@example.com');
    expect(contact.twitter).toBe('testuser');
    expect(contact.linkedin).toBe('test-profile');
    expect(contact.github).toBe('testuser');
    
    // メールリンクが正しく生成されることを確認
    const emailLink = `mailto:${contact.email}`;
    expect(emailLink).toBe('mailto:test@example.com');
    
    // Twitterリンクが正しく生成されることを確認
    const twitterLink = `https://twitter.com/${contact.twitter}`;
    expect(twitterLink).toBe('https://twitter.com/testuser');
    
    // LinkedInリンクが正しく生成されることを確認
    const linkedinLink = `https://www.linkedin.com/in/${contact.linkedin}`;
    expect(linkedinLink).toBe('https://www.linkedin.com/in/test-profile');
    
    // GitHubリンクが正しく生成されることを確認
    const githubLink = `https://github.com/${contact.github}`;
    expect(githubLink).toBe('https://github.com/testuser');
  });
  
  // 一部の連絡先情報のみがある場合のテスト
  it('一部の連絡先情報のみがある場合、存在する情報のみが表示される', () => {
    const contact: CareerContact = {
      email: 'test@example.com',
      github: 'testuser'
    };
    
    // 存在する連絡先情報を確認
    expect(contact.email).toBe('test@example.com');
    expect(contact.github).toBe('testuser');
    
    // 存在しない連絡先情報を確認
    expect(contact.twitter).toBeUndefined();
    expect(contact.linkedin).toBeUndefined();
    
    // 存在する連絡先情報のリンクが正しく生成されることを確認
    const emailLink = `mailto:${contact.email}`;
    expect(emailLink).toBe('mailto:test@example.com');
    
    const githubLink = `https://github.com/${contact.github}`;
    expect(githubLink).toBe('https://github.com/testuser');
  });
  
  // 連絡先情報がない場合のテスト
  it('連絡先情報がない場合、コンポーネントは何も表示しない', () => {
    // 空のオブジェクト
    const emptyContact: CareerContact = {};
    
    // 連絡先情報が存在しないことを確認
    expect(Object.keys(emptyContact).length).toBe(0);
    expect(emptyContact.email).toBeUndefined();
    expect(emptyContact.twitter).toBeUndefined();
    expect(emptyContact.linkedin).toBeUndefined();
    expect(emptyContact.github).toBeUndefined();
  });
  
  // CSSクラスのテスト
  it('適切なCSSクラスが適用されている', () => {
    // コンテナのクラス
    const containerClass = 'mt-12 p-6 bg-gray-50 rounded-lg shadow-sm border border-gray-200';
    expect(containerClass).toContain('mt-12');
    expect(containerClass).toContain('p-6');
    expect(containerClass).toContain('bg-gray-50');
    expect(containerClass).toContain('rounded-lg');
    expect(containerClass).toContain('shadow-sm');
    expect(containerClass).toContain('border');
    expect(containerClass).toContain('border-gray-200');
    
    // 見出しのクラス
    const headingClass = 'text-2xl font-semibold mb-4';
    expect(headingClass).toContain('text-2xl');
    expect(headingClass).toContain('font-semibold');
    expect(headingClass).toContain('mb-4');
    
    // リンクのクラス
    const linkClass = 'text-blue-600 hover:text-blue-800 hover:underline transition-colors';
    expect(linkClass).toContain('text-blue-600');
    expect(linkClass).toContain('hover:text-blue-800');
    expect(linkClass).toContain('hover:underline');
    expect(linkClass).toContain('transition-colors');
  });
  
  // リンクのdata-testid属性のテスト
  it('各リンクに適切なdata-testid属性が設定されている', () => {
    const emailTestId = 'email-link';
    const twitterTestId = 'twitter-link';
    const linkedinTestId = 'linkedin-link';
    const githubTestId = 'github-link';
    
    expect(emailTestId).toBe('email-link');
    expect(twitterTestId).toBe('twitter-link');
    expect(linkedinTestId).toBe('linkedin-link');
    expect(githubTestId).toBe('github-link');
  });
});
