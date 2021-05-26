package NoWaiter.GatewayService.config;

import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {
	private final AuthenticationFilter authenticationFilter;

    public WebSecurityConfiguration(AuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }
    
    @Override
    public void configure(final HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
                .anonymous()
        .and()
                .exceptionHandling().authenticationEntryPoint((request, response, ex) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
        .and()
        .cors().and()
                .addFilterAfter(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                	.antMatchers("/auth-api/api/auth/login").permitAll()
                	
                	.antMatchers(HttpMethod.POST ,"/product-api/api/products/categories").hasRole("OBJADMIN")
                	.antMatchers(HttpMethod.GET ,"/product-api/api/products/categories").hasRole("OBJADMIN")
                	.antMatchers(HttpMethod.POST ,"/product-api/api/products").hasRole("OBJADMIN")

                	.antMatchers(HttpMethod.POST ,"/object-api/api/objects").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.PUT ,"/object-api/api/objects/image/**").hasRole("OBJADMIN")
                	.antMatchers(HttpMethod.PUT ,"/object-api/api/objects/**").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.PUT ,"/object-api/api/objects").hasRole("SYSADMIN")

                	.antMatchers(HttpMethod.POST ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.GET ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.PUT ,"/user-api/api/users/object-admin").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.DELETE ,"/user-api/api/users/object-admin/**").hasRole("SYSADMIN")

                	.antMatchers(HttpMethod.POST ,"/user-api/api/users/employee/waiter").hasRole("OBJADMIN")
                	.antMatchers(HttpMethod.GET ,"/user-api/api/users/employee/waiter").hasRole("OBJADMIN")
                	
                	.antMatchers(HttpMethod.POST ,"/object-api/api/objects/tables").hasRole("OBJADMIN")
                	.antMatchers(HttpMethod.GET ,"/object-api/api/objects/tables").hasRole("OBJADMIN")
                	.antMatchers(HttpMethod.DELETE ,"/object-api/api/objects/tables/**").hasRole("OBJADMIN")
                	
                	.antMatchers(HttpMethod.GET ,"/user-api/api/users/deliverer-request").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverer-request/**").hasRole("SYSADMIN")
                	
                	.antMatchers(HttpMethod.POST ,"/user-api/api/users/deliverers").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.GET ,"/user-api/api/users/deliverers").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.PUT ,"/user-api/api/users/deliverers/**").hasRole("SYSADMIN")
                	.antMatchers(HttpMethod.DELETE ,"/user-api/api/users/deliverers/**").hasRole("SYSADMIN")
                    //.antMatchers("/auth-api/**").permitAll()
                    //.antMatchers("/object-api/**").permitAll()
                    //.antMatchers("/user-api/**").permitAll()
                    .anyRequest().permitAll();
    }
}
